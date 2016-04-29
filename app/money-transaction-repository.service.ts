import {Injectable} from 'angular2/core';
import Dexie from 'dexie';
import * as lodash from 'lodash';

import {AppDatabase, Relation, Entity} from './app-database.ts';
import {AppDatabaseProvider} from './app-database-provider.service';

type DexiePromise<R> = Dexie.Promise<R>;

@Injectable()
export class MoneyTransactionRepository {

  private db: AppDatabase;

  constructor(AppDatabaseProvider: AppDatabaseProvider) {
    const AppDatabase = AppDatabaseProvider.getConstructor();
    this.db           = new AppDatabase();
  }

  async pull(): Promise<any> {
    const moneyTransactionsArray = await this.db.moneyTransactions.toArray();

    const joinQueryIds = (() => {
      const ids = {
        accounts     : [],
        categories   : [],
        subcategories: [],
        payeePayers  : [],
        tags         : []
      } as Relation<number[]>;
      moneyTransactionsArray.forEach((item) => {
        ids.accounts     .push(item.accountId);
        ids.accounts     .push(item.accountToId);
        ids.categories   .push(item.categoryId);
        ids.subcategories.push(item.subcategoryId);
        ids.payeePayers  .push(item.payeePayerId);
        ids.tags         .push(item.tagId);
      });
      ids.accounts      = lodash.chain(ids.accounts)     .compact().uniq().value();
      ids.categories    = lodash.chain(ids.categories)   .compact().uniq().value();
      ids.subcategories = lodash.chain(ids.subcategories).compact().uniq().value();
      ids.payeePayers   = lodash.chain(ids.payeePayers)  .compact().uniq().value();
      ids.tags          = lodash.chain(ids.tags)         .compact().uniq().value();

      return ids;
    })();

    const allMap = await (async (_ids: Relation<number[]>) => {
      let accounts      = [] as DexiePromise<Entity[]>[];
      let categories    = [] as DexiePromise<Entity[]>[];
      let subcategories = [] as DexiePromise<Entity[]>[];
      let payeePayers   = [] as DexiePromise<Entity[]>[];
      let tags          = [] as DexiePromise<Entity[]>[];
      const tables = [
        this.db.accounts,
        this.db.categories,
        this.db.subcategories,
        this.db.payeePayers,
        this.db.tags
      ];
      await this.db.transaction('r', tables, () => {
        _ids.accounts     .forEach((id) => accounts     .push(this.db.accounts     .where('id').equals(id).toArray()));
        _ids.categories   .forEach((id) => categories   .push(this.db.categories   .where('id').equals(id).toArray()));
        _ids.subcategories.forEach((id) => subcategories.push(this.db.subcategories.where('id').equals(id).toArray()));
        _ids.payeePayers  .forEach((id) => payeePayers  .push(this.db.payeePayers  .where('id').equals(id).toArray()));
        _ids.tags         .forEach((id) => tags         .push(this.db.tags         .where('id').equals(id).toArray()));
      });

      const allResolved = {
        accounts     : lodash.flattenDeep<Entity>(await Dexie.Promise.all(accounts)),
        categories   : lodash.flattenDeep<Entity>(await Dexie.Promise.all(categories)),
        subcategories: lodash.flattenDeep<Entity>(await Dexie.Promise.all(subcategories)),
        payeePayers  : lodash.flattenDeep<Entity>(await Dexie.Promise.all(payeePayers)),
        tags         : lodash.flattenDeep<Entity>(await Dexie.Promise.all(tags)),
      } as Relation<Entity[]>;

      const _allMap = {
        accounts:      new Map(),
        categories:    new Map(),
        subcategories: new Map(),
        payeePayers:   new Map(),
        tags:          new Map()
      } as Relation<Map<number, string>>;

      allResolved.accounts     .map((item) => _allMap.accounts     .set(item.id, item.name));
      allResolved.categories   .map((item) => _allMap.categories   .set(item.id, item.name));
      allResolved.subcategories.map((item) => _allMap.subcategories.set(item.id, item.name));
      allResolved.payeePayers  .map((item) => _allMap.payeePayers  .set(item.id, item.name));
      allResolved.tags         .map((item) => _allMap.tags         .set(item.id, item.name));

      return _allMap;
    })(joinQueryIds);

    return moneyTransactionsArray.map((item) => {
      let obj = {} as any;
      obj.type           = item.type;
      obj.date           = item.date;
      obj.currencyCode   = item.currencyCode;
      obj.amount         = item.amount;
      obj.currencyCodeTo = item.currencyCodeTo;
      obj.amountTo       = item.amountTo;
      obj.note           = item.note;

      obj.account     = allMap.accounts     .get(item.accountId);
      obj.category    = allMap.categories   .get(item.categoryId);
      obj.subcategory = allMap.subcategories.get(item.subcategoryId);
      obj.payeePayer  = allMap.payeePayers  .get(item.payeePayerId);
      obj.tag         = allMap.tags         .get(item.tagId);
      return obj
    });
  }

}
