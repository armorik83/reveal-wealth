import {Injectable} from '@angular/core';
import {Dispatcher} from './walts-proto';

import {AppState} from './app.store';

@Injectable()
export class AppDispatcher extends Dispatcher<AppState> {
  // noop
}
