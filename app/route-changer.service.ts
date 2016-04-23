import {Router} from 'angular2/router';

import {Injectable} from 'angular2/core';
import {AppDispatcher} from './app.dispatcher';
import {ToTransactionsAction} from './to-transactions.action';
import {ToImportDataAction} from './to-import-data.action';

@Injectable()
export class RouteChanger {

  constructor(private AppDispatcher: AppDispatcher,
              private Router: Router) {
    // noop
  }

  /**
   * Change a state to 'transactions'.
   */
  toTransactions(): void {
    this.AppDispatcher.emit(new ToTransactionsAction(this.Router));
  }

  /**
   * Change a state to 'import-data'.
   */
  toImportData(): void {
    this.AppDispatcher.emit(new ToImportDataAction(this.Router));
  }

}
