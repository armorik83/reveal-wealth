import {Injectable} from 'angular2/core';

import {AppDatabase} from './app-database.ts';
import {AppDatabaseProvider} from './app-database-provider.service';

@Injectable()
export class MoneyTransactionRepository {

  private db: AppDatabase;

  constructor(AppDatabaseProvider: AppDatabaseProvider) {
    const AppDatabase = AppDatabaseProvider.getConstructor();
    this.db           = new AppDatabase();
  }

  async store(importedResult: any[]): Promise<any> {
    this.initialize();
    return await this.db.transaction('rw', this.db.rawEntities, () => {
      importedResult.forEach((item: any) => {
        this.db.rawEntities.add({
          'Type'          : item['Type'],
          'Date'          : item['Date'],
          'Account'       : item['Account'],
          'CurrencyCode'  : item['CurrencyCode'],
          'Amount'        : item['Amount'],
          'AccountTo'     : item['AccountTo'],
          'CurrencyCodeTo': item['CurrencyCodeTo'],
          'AmountTo'      : item['AmountTo'],
          'Category'      : item['Category'],
          'Subcategory'   : item['Subcategory'],
          'PayeePayer'    : item['Payee/Payer'],
          'Tag'           : item['Tag'],
          'Note'          : item['Note']
        });
      });
    });
  }

  async pull(): Promise<any> {
    return await this.db.rawEntities.toArray();
  }

  private initialize(): void {
    this.db.initialize();
  }

}
