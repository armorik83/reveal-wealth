import {Injectable} from 'angular2/core';

import {AppDatabase} from './app-database';

@Injectable()
export class AppDatabaseProvider {

  getConstructor(): typeof AppDatabase {
    return AppDatabase;
  }

}