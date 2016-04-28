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

  async pull(): Promise<any> {
    return await this.db.moneyTransactions.toArray();
  }

}
