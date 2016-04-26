import Dexie from 'dexie';

import {APP_NAME} from './constants';

export class AppDatabase extends Dexie {

  moneyTransactions: Dexie.Table<any, any>;

  constructor() {
    super(APP_NAME);

    this.defineScheme();
  }

  initialize(): void {
    indexedDB.deleteDatabase(APP_NAME);
  }

  private defineScheme(): void {
    this.version(1).stores({
      moneyTransactions: '++id, Type, Date, Note'
    });
  }

}