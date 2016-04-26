import {Injectable} from 'angular2/core';
import Dexie from 'dexie';

import {APP_NAME} from './constants';
import {WindowProvider} from './window-provider.service';

interface ExtendedDexie extends Dexie {
  moneyTransactions: Dexie.Table<any, any>;
}

@Injectable()
export class MoneyTransactionRepository {

  private window: Window;
  private db: ExtendedDexie;

  constructor(WindowProvider: WindowProvider) {
    this.window = WindowProvider.getWindow();

    this.db = <ExtendedDexie>new Dexie(APP_NAME);
    this.db.version(1).stores({
      moneyTransactions: '++id, Type, Date, Note'
    });
  }

  initialize(): void {
    this.window.indexedDB.deleteDatabase(APP_NAME);
  }

  async store(importedResult: any[]): Promise<any> {
    return await this.db.transaction('rw', this.db.moneyTransactions, () => {
      importedResult.forEach((item) => {
        this.db.moneyTransactions.add({
          Type: item.Type,
          Date: item.Date,
          Note: item.Note
        });
      });
    });
  }

  async get(): Promise<any> {
    return await this.db.moneyTransactions.toArray();
  }

}
