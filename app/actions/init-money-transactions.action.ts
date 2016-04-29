import {Injectable} from 'angular2/core';
import {Action} from '../walts-proto';

import {AppState} from '../app.store';

@Injectable()
export class InitMoneyTransactionsAction extends Action<AppState> {

  create(): this {
    this.createReducer((curr: AppState, next: AppState) => {
      return Promise.resolve(next);
    });
    return this;
  }

}
