import {Injectable} from "angular2/core";

import {AppDispatcher} from './app.dispatcher';
import {State, Store} from './flux/store';

export class AppState extends State {
  num: number;
}

const INIT_STATE: AppState = {
  num: 0
};

@Injectable()
export class AppStore extends Store<AppState> {

  constructor(private AppDispatcher: AppDispatcher) {
    super(INIT_STATE, AppDispatcher);
  }

}