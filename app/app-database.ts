import Dexie from 'dexie';

import {APP_NAME} from './constants';
import {PrePersistMoneyTransaction} from './domain/core/money-transaction/pre-persist-money-transaction copy';
import {MoneyTransaction} from './domain/core/money-transaction/money-transaction';
import {MoneyTransactionId} from './domain/core/money-transaction/money-transaction-id';

type Table<T, Key> = Dexie.Table<T, Key>;
type DexiePromise<R> = Dexie.Promise<R>;

export interface Entity {
  id?: number;
  name: string;
}

interface Account extends Entity {
  //
}

interface Category extends Entity {
  //
}

interface Subcategory extends Entity {
  //
}

interface PayeePayer extends Entity {
  //
}

interface Tag extends Entity {
  //
}

export interface Relation<T> {
  accounts:      T;
  categories:    T;
  subcategories: T;
  payeePayers:   T;
  tags:          T;
}

export class AppDatabase extends Dexie {

  moneyTransactions: Table<MoneyTransaction | PrePersistMoneyTransaction, number>;
  accounts: Table<Account, number>;
  categories: Table<Category, number>;
  subcategories: Table<Subcategory, number>;
  payeePayers: Table<PayeePayer, number>;
  tags: Table<Tag, number>;

  constructor() {
    super(APP_NAME);

    this.defineScheme();
  }

  initialize(): void {
    indexedDB.deleteDatabase(APP_NAME);
  }

  addMoneyTransaction(entity: PrePersistMoneyTransaction): DexiePromise<number> {
    return this.moneyTransactions.add(entity);
  }

  addMoneyTransactions(items: any[], relationIdMap: Relation<Map<string, number>>): DexiePromise<any> {
    return this.transaction('rw', this.moneyTransactions, () => {
      items.forEach((item) => {
        this.addMoneyTransaction(new PrePersistMoneyTransaction(item, relationIdMap));
      });
    });
  }

  async getMoneyTransaction(id: MoneyTransactionId): Promise<MoneyTransaction[]> {
    return await this.moneyTransactions
      .where('id')
      .equals(id.value)
      .toArray() as MoneyTransaction[];
  }

  async getAllMoneyTransactions(): Promise<MoneyTransaction[]> {
    return await this.moneyTransactions
      .toArray() as MoneyTransaction[];
  }

  async getCategory(id: number): Promise<Category[]> {
    return await this.categories
      .where('id')
      .equals(id)
      .toArray() as Category[];
  }

  private defineScheme(): void {
    this.version(1).stores({
      moneyTransactions: MoneyTransaction.schema,
      accounts     : '++id, &name',
      categories   : '++id, &name',
      subcategories: '++id, &name',
      payeePayers  : '++id, &name',
      tags         : '++id, &name'
    });
  }

}
