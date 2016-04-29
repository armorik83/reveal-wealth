import {Injectable} from 'angular2/core';
import {State, Store} from './walts-proto';

import {AppDispatcher} from './app.dispatcher';
import {BindableMoneyTransaction} from './domain/application/money-transaction/bindable-money-transaction';

export type RouteState =
  'MoneyTransactionsComponent' |
  'MoneyTransactionDetailComponent' |
  'ImportDataComponent' |
  'n/a';

export class AppState extends State {
  routeState:        RouteState;
  num:               number;
  moneyTransactions: BindableMoneyTransaction[];
  moneyTransaction:  BindableMoneyTransaction;
}

const INIT_STATE: AppState = {
  routeState       : 'n/a',
  num              : 0,
  moneyTransactions: [],
  moneyTransaction : null
};

@Injectable()
export class AppStore extends Store<AppState> {

  constructor(private AppDispatcher: AppDispatcher) {
    super(INIT_STATE, AppDispatcher);
  }

}
