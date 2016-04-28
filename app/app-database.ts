import Dexie from 'dexie';

import {APP_NAME} from './constants';

type Table<T, Key> = Dexie.Table<T, Key>;

interface Entity {
  id?: number;
  name: string;
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
      accounts     : '++id, &name',
      categories   : '++id, &name',
      subcategories: '++id, &name',
      payeePayers  : '++id, &name',
      tags         : '++id, &name'
    });
  }

}
