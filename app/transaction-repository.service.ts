import {Injectable} from 'angular2/core';
import Dexie from 'dexie';

import {APP_NAME} from './constants';

interface ExtendedDexie extends Dexie {
  moneyTransactions: Dexie.Table<any, any>;
}

@Injectable()
export class TransactionRepository {

  private db: ExtendedDexie;

  constructor() {
    this.db = <ExtendedDexie>new Dexie(APP_NAME);
    this.db.version(1).stores({
      moneyTransactions: '++id,Type,Date'
    });
    this.db.open();
  }
  
  store(importedResult: any[]): void {
    importedResult.forEach((item) => {
      this.db.moneyTransactions.put({
        Type: item.Type,
        Date: item.Date,
      });
    });
  }

  async get(): Promise<any> {
    return new Promise(async (resolve) => {
      const array = await this.db.moneyTransactions.toArray()
      console.log(array);
      resolve(array);
    })
  }
  
}