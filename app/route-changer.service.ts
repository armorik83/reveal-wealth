import {Injectable} from 'angular2/core';
import {AppDispatcher} from './app.dispatcher';
import {ToTransactionsAction} from './to-transactions.action';
import {ToImportDataAction} from './to-import-data.action';

@Injectable()
export class RouteChanger {

  constructor(private AppDispatcher: AppDispatcher,
              private ToTransactionsAction: ToTransactionsAction,
              private ToImportDataAction: ToImportDataAction) {
    // noop
  }

  /**
   * Change a state to 'transactions'.
   */
  toTransactions(): void {
    this.AppDispatcher.emit(this.ToTransactionsAction.create());
  }

  /**
   * Change a state to 'import-data'.
   */
  toImportData(): void {
    this.AppDispatcher.emit(this.ToImportDataAction.create());
  }

}
