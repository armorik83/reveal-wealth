import {Injectable} from 'angular2/core';

import {Dispatcher} from './flux/dispatcher';
import {AppState} from './app.store';

@Injectable()
export class AppDispatcher extends Dispatcher<AppState> {
  // noop
}