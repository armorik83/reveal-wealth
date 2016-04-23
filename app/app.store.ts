import {Injectable} from 'angular2/core';

import {AppDispatcher} from './app.dispatcher';
import {State, Store} from './flux/store';

export type RouteState =
  'TransactionsComponent' |
  'ImportDataComponent' |
  'n/a';

export class AppState extends State {
  routeState: RouteState;
  num: number;
}

const INIT_STATE: AppState = {
  routeState: 'n/a',
  num       : 0
};

@Injectable()
export class AppStore extends Store<AppState> {

  constructor(private AppDispatcher: AppDispatcher) {
    super(INIT_STATE, AppDispatcher);
  }

}
