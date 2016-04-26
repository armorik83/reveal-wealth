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

  async pull(): Promise<any> {
    return await this.db.moneyTransactions.toArray();
  }

  private initialize(): void {
    this.db.initialize();
  }

}
