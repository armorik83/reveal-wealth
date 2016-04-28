import Dexie from 'dexie';

import {APP_NAME} from './constants';

type Table<T, Key> = Dexie.Table<T, Key>;

interface Entity {
  id?: number;
}

interface MoneyTransaction extends Entity {
  type: string;
  date: string;
  accountId: number;
  currencyCode: string;
  amount: number;
  accountToId: number;
  currencyCodeTo: string;
  amountTo: number;
  categoryId: number;
  subcategoryId: number;
  payeePayerId: number;
  tagId: number;
  note: string;
}

interface Account extends Entity {
  account: string;
}

interface Category extends Entity {
  category: string;
}

interface Subcategory extends Entity {
  subcategory: string;
}

interface PayeePayer extends Entity {
  payeePayer: string;
}

interface Tag extends Entity {
  tag: string;
}

export class AppDatabase extends Dexie {

  moneyTransactions: Table<MoneyTransaction, number>;
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

  private defineScheme(): void {
    this.version(1).stores({
      moneyTransactions: [
        '++id',
        'type',
        'date',
        'accountId',
        'currencyCode',
        'amount',
        'accountToId',
        'currencyCodeTo',
        'amountTo',
        'categoryId',
        'subcategoryId',
        'payeePayerId',
        'tagId',
        'note'
      ].join(','),
      accounts     : '++id, &account',
      categories   : '++id, &category',
      subcategories: '++id, &subcategory',
      payeePayers  : '++id, &payeePayer',
      tags         : '++id, &tag'
    });
  }

}
