import Dexie from 'dexie';

import {APP_NAME} from './constants';

interface RawEntity {
  [key: string]: string;
}

export class AppDatabase extends Dexie {

  rawEntities: Dexie.Table<RawEntity, any>;

  constructor() {
    super(APP_NAME);

    this.defineScheme();
  }

  initialize(): void {
    indexedDB.deleteDatabase(APP_NAME);
  }

  private defineScheme(): void {
    this.version(1).stores({
      rawEntities: [
        '++id',
        'Type',
        'Date',
        'Account',
        'CurrencyCode',
        'Amount',
        'AccountTo',
        'CurrencyCodeTo',
        'AmountTo',
        'Category',
        'Subcategory',
        'PayeePayer',
        'Tag',
        'Note'
      ].join(',')
    });
  }

}