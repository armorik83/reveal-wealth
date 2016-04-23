import {Router} from 'angular2/router';

import {Injectable} from 'angular2/core';
import {AppDispatcher} from './app.dispatcher';
import {ToTransactionsAction} from './to-transactions.action';

@Injectable()
export class RouteChanger {

  constructor(private AppDispatcher: AppDispatcher,
              private Router: Router) {
    //
  }

  /**
   * Change a state to 'transactions'.
   */
  toTransactions(): void {
    this.AppDispatcher.emit(new ToTransactionsAction(this.Router));
  }

}
