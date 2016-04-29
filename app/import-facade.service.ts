import {Injectable} from 'angular2/core';
import * as lodash from 'lodash';

import {AppDatabaseProvider} from './app-database-provider.service';
import {AppDatabase, Relation} from './app-database';

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
    const uniqueValues = await (async (): Promise<Relation<string[]>> => {
      let allValues = {
        accounts     : [],
        categories   : [],
        subcategories: [],
        payeePayers  : [],
        tags         : []
      } as Relation<string[]>;
      importedResult.forEach((item) => {
        allValues.accounts     .push(item['Account']);
        allValues.accounts     .push(item['AccountTo']);
        allValues.categories   .push(item['Category']);
        allValues.subcategories.push(item['Subcategory']);
        allValues.payeePayers  .push(item['Payee/Payer']);
        allValues.tags         .push(item['Tag']);
      });

      return {
        accounts     : lodash.chain(allValues.accounts)     .uniq().value(),
        categories   : lodash.chain(allValues.categories)   .uniq().value(),
        subcategories: lodash.chain(allValues.subcategories).uniq().value(),
        payeePayers  : lodash.chain(allValues.payeePayers)  .uniq().value(),
        tags         : lodash.chain(allValues.tags)         .uniq().value()
      };
    })();

    // It adds the entity name that has been the removal of duplication in a database.
    await (async (_uniqueValues: Relation<string[]>) => {
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
        accounts     : new Map(),
        categories   : new Map(),
        subcategories: new Map(),
        payeePayers  : new Map(),
        tags         : new Map()
      } as Relation<Map<string, number>>;
      const promises = [
        this.db.accounts     .each((item) => _idMap.accounts     .set(item.name, item.id)),
        this.db.categories   .each((item) => _idMap.categories   .set(item.name, item.id)),
        this.db.subcategories.each((item) => _idMap.subcategories.set(item.name, item.id)),
        this.db.payeePayers  .each((item) => _idMap.payeePayers  .set(item.name, item.id)),
        this.db.tags         .each((item) => _idMap.tags         .set(item.name, item.id))
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
          'currencyCode'  : item['CurrencyCode'],
          'amount'        : item['Amount'],
          'currencyCodeTo': item['CurrencyCodeTo'],
          'amountTo'      : item['AmountTo'],
          'note'          : item['Note'],
          'accountId'     : idMap.accounts     .get(item['Account']),
          'accountToId'   : idMap.accounts     .get(item['AccountTo']),
          'categoryId'    : idMap.categories   .get(item['Category']),
          'subcategoryId' : idMap.subcategories.get(item['Subcategory']),
          'payeePayerId'  : idMap.payeePayers  .get(item['Payee/Payer']),
          'tagId'         : idMap.tags         .get(item['Tag']),
        });
      });
    });
  }

}
