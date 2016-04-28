import {Injectable} from 'angular2/core';

import {AppDatabaseProvider} from './app-database-provider.service';
import {AppDatabase} from './app-database';

@Injectable()
export class ImportFacade {

  private db: AppDatabase;

  constructor(AppDatabaseProvider: AppDatabaseProvider) {
    const AppDatabase = AppDatabaseProvider.getConstructor();
    this.db           = new AppDatabase();
  }

  async normalize(importedResult: any[]): Promise<any> {
    this.db.initialize();

    let allValues = {
      account    : [] as string[],
      category   : [] as string[],
      subcategory: [] as string[],
      payeePayer : [] as string[],
      tag        : [] as string[],
    };
    importedResult.forEach((item) => {
      allValues.account    .push(item['Account']);
      allValues.account    .push(item['AccountTo']);
      allValues.category   .push(item['Category']);
      allValues.subcategory.push(item['Subcategory']);
      allValues.payeePayer .push(item['Payee/Payer']);
      allValues.tag        .push(item['Tag']);
    });
    const uniqueFilter = (v: string, i: number, self: string[]) => {
      return !!v && self.indexOf(v) === i;
    };
    let uniqueValues = {
      account    : allValues.account    .filter(uniqueFilter),
      category   : allValues.category   .filter(uniqueFilter),
      subcategory: allValues.subcategory.filter(uniqueFilter),
      payeePayer : allValues.payeePayer .filter(uniqueFilter),
      tag        : allValues.tag        .filter(uniqueFilter)
    };

    const tables = [
      this.db.accounts,
      this.db.categories,
      this.db.subcategories,
      this.db.payeePayers,
      this.db.tags
    ];
    await this.db.transaction('rw', tables, () => {
      uniqueValues.account    .forEach((name) => this.db.accounts.add({name}));
      uniqueValues.category   .forEach((name) => this.db.categories.add({name}));
      uniqueValues.subcategory.forEach((name) => this.db.subcategories.add({name}));
      uniqueValues.payeePayer .forEach((name) => this.db.payeePayers.add({name}));
      uniqueValues.tag        .forEach((name) => this.db.tags.add({name}));
    });

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

    return await this.db.transaction('rw', this.db.moneyTransactions, () => {
      console.log(idMap.accounts);
      importedResult.forEach((item) => {
        console.log(`item['Account']`, item['Account']);
        console.log(`idMap.accounts[item['Account']]`, idMap.accounts[item['Account']]);
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
