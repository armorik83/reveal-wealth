import {Injectable} from '@angular/core';

import {AppDatabase} from './app-database';

@Injectable()
export class AppDatabaseProvider {

  getConstructor(): typeof AppDatabase {
    return AppDatabase;
  }

}
