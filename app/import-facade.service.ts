import {Injectable} from 'angular2/core';

import {AppDatabaseProvider} from './app-database-provider.service';
import {AppDatabase} from './app-database';

interface UniqueValues {
  accounts:      string[];
  categories:    string[];
  subcategories: string[];
  payeePayers:   string[];
  tags:          string[];
}

@Injectable()
export class ImportFacade {

  private db: AppDatabase;

  constructor(AppDatabaseProvider: AppDatabaseProvider) {
    const AppDatabase = AppDatabaseProvider.getConstructor();
    this.db           = new AppDatabase();
  }

  async normalize(importedResult: any[]): Promise<any> {
    this.db.initialize();

    // For five of the sub-entity to eliminate duplicate.
    const uniqueValues = await (async (): Promise<UniqueValues> => {
      let allValues = {
        accounts     : [] as string[],
        categories   : [] as string[],
        subcategories: [] as string[],
        payeePayers  : [] as string[],
        tags         : [] as string[],
      };
      importedResult.forEach((item) => {
        allValues.accounts     .push(item['Account']);
        allValues.accounts     .push(item['AccountTo']);
        allValues.categories   .push(item['Category']);
        allValues.subcategories.push(item['Subcategory']);
        allValues.payeePayers  .push(item['Payee/Payer']);
        allValues.tags         .push(item['Tag']);
      });

      const uniqueFilter = (v: string, i: number, self: string[]) => {
        return !!v && self.indexOf(v) === i;
      };
      return {
        accounts     : allValues.accounts     .filter(uniqueFilter),
        categories   : allValues.categories   .filter(uniqueFilter),
        subcategories: allValues.subcategories.filter(uniqueFilter),
        payeePayers  : allValues.payeePayers  .filter(uniqueFilter),
        tags         : allValues.tags         .filter(uniqueFilter)
      };
    })();

    // It adds the entity name that has been the removal of duplication in a database.
    await (async (_uniqueValues: UniqueValues) => {
      const tables = [
        this.db.accounts,
        this.db.categories,
        this.db.subcategories,
        this.db.payeePayers,
        this.db.tags
      ];
      await this.db.transaction('rw', tables, () => {
        _uniqueValues.accounts     .forEach((name) => this.db.accounts     .add({name}));
        _uniqueValues.categories   .forEach((name) => this.db.categories   .add({name}));
        _uniqueValues.subcategories.forEach((name) => this.db.subcategories.add({name}));
        _uniqueValues.payeePayers  .forEach((name) => this.db.payeePayers  .add({name}));
        _uniqueValues.tags         .forEach((name) => this.db.tags         .add({name}));
      });
    })(uniqueValues);

    // To retain the id of the added entity to the database as a object map.
    const idMap = await (async () => {
      let _idMap = {
        accounts     : {} as {[name: string]: number},
        categories   : {} as {[name: string]: number},
        subcategories: {} as {[name: string]: number},
        payeePayers  : {} as {[name: string]: number},
        tags         : {} as {[name: string]: number}
      };
      const promises = [
        this.db.accounts     .each((item) => _idMap.accounts[item.name]      = item.id),
        this.db.categories   .each((item) => _idMap.categories[item.name]    = item.id),
        this.db.subcategories.each((item) => _idMap.subcategories[item.name] = item.id),
        this.db.payeePayers  .each((item) => _idMap.payeePayers[item.name]   = item.id),
        this.db.tags         .each((item) => _idMap.tags[item.name]          = item.id)
      ];
      await Promise.all(promises);
      return _idMap;
    })();

    // It will persist main entity in the database.
    return await this.db.transaction('rw', this.db.moneyTransactions, () => {
      importedResult.forEach((item) => {
        this.db.moneyTransactions.add(<any>{
          'type'          : item['Type'],
          'date'          : item['Date'],
          'accountId'     : idMap.accounts[item['Account']],
          'currencyCode'  : item['CurrencyCode'],
          'amount'        : item['Amount'],
          'accountToId'   : idMap.accounts[item['Account']],
          'currencyCodeTo': item['CurrencyCodeTo'],
          'amountTo'      : item['AmountTo'],
          'categoryId'    : idMap.categories[item['Category']],
          'subcategoryId' : idMap.subcategories[item['Subcategory']],
          'payeePayerId'  : idMap.payeePayers[item['Payee/Payer']],
          'tagId'         : idMap.tags[item['Tag']],
          'note'          : item['Note']
        });
      });
    });
  }

}
