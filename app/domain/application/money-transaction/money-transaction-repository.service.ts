import {Injectable} from 'angular2/core';
import Dexie from 'dexie';
import * as lodash from 'lodash';

import {AbstractRepository} from '../abstract/abstract-repository.service';
import {AppDatabase, Relation, Entity} from '../../../app-database.ts';
import {AppDatabaseProvider} from '../../../app-database-provider.service';
import {MoneyTransaction} from '../../core/money-transaction/money-transaction';
import {MoneyTransactionId} from '../../core/money-transaction/money-transaction-id';
import {BindableMoneyTransaction} from './bindable-money-transaction';

type DexiePromise<R> = Dexie.Promise<R>;

@Injectable()
export class MoneyTransactionRepository extends AbstractRepository<MoneyTransactionId> {

  private db: AppDatabase;

  constructor(AppDatabaseProvider: AppDatabaseProvider) {
    super();
    const AppDatabase = AppDatabaseProvider.getConstructor();
    this.db           = new AppDatabase();
  }

  async pull(id: MoneyTransactionId): Promise<BindableMoneyTransaction> {
    const target           = await this.db.getMoneyTransaction(id);
    const joinQueryIds     = this.joinQueryIds(target);
    const relationValueMap = await this.relationValueMap(joinQueryIds);
    return new BindableMoneyTransaction(target[0], relationValueMap);
  }

  async pullAll(): Promise<BindableMoneyTransaction[]> {
    const moneyTransactionArray = await this.db.getAllMoneyTransactions();
    const joinQueryIds          = this.joinQueryIds(moneyTransactionArray);
    const relationValueMap      = await this.relationValueMap(joinQueryIds);

    return moneyTransactionArray.map((item) => {
      return new BindableMoneyTransaction(item, relationValueMap);
    });
  }

  private joinQueryIds(moneyTransactionArray: MoneyTransaction[]): Relation<number[]> {
    const ids = {
      accounts     : [],
      categories   : [],
      subcategories: [],
      payeePayers  : [],
      tags         : []
    } as Relation<number[]>;
    moneyTransactionArray.forEach((item) => {
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
  }

  private async relationValueMap(joinQueryIds: Relation<number[]>): Promise<Relation<Map<number, string>>> {
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
      joinQueryIds.accounts     .forEach((id) => accounts     .push(this.db.accounts     .where('id').equals(id).toArray()));
      joinQueryIds.categories   .forEach((id) => categories   .push(this.db.categories   .where('id').equals(id).toArray()));
      joinQueryIds.subcategories.forEach((id) => subcategories.push(this.db.subcategories.where('id').equals(id).toArray()));
      joinQueryIds.payeePayers  .forEach((id) => payeePayers  .push(this.db.payeePayers  .where('id').equals(id).toArray()));
      joinQueryIds.tags         .forEach((id) => tags         .push(this.db.tags         .where('id').equals(id).toArray()));
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
  }

}
