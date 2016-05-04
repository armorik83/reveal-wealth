import {View} from './walts-proto/view';

import {AppDispatcher} from './app.dispatcher';
import {AppStore, AppState} from './app.store';

export class AppView extends View<AppDispatcher, AppStore, AppState> {

  constructor(protected AppDispatcher: AppDispatcher,
              protected AppStore: AppStore) {
    super(AppDispatcher, AppStore);
  }

}