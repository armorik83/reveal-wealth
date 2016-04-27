import {Injectable} from 'angular2/core';
import {State, Store} from './walts-proto';

import {AppDispatcher} from './app.dispatcher';

export type RouteState =
  'MoneyTransactionsComponent' |
  'ImportDataComponent' |
  'n/a';

export class AppState extends State {
  routeState: RouteState;
  num: number;
  json: any[];
}

const INIT_STATE: AppState = {
  routeState: 'n/a',
  num       : 0,
  json      : []
};

@Injectable()
export class AppStore extends Store<AppState> {

  constructor(private AppDispatcher: AppDispatcher) {
    super(INIT_STATE, AppDispatcher);
  }

}
