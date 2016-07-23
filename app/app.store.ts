import {Injectable} from '@angular/core';
import {State, Store} from 'walts';

import {AppDispatcher} from './app.dispatcher';
import {BindableMoneyTransaction} from './domain/application/money-transaction/bindable-money-transaction';
import {RouteState} from './app-router-definition';

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

  constructor(protected dispatcher: AppDispatcher) {
    super(INIT_STATE, dispatcher);
  }

}
