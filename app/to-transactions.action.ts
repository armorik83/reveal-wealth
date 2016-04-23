import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';

import {Action} from './flux/action';
import {AppState} from './app.store';
import {TransactionsComponent} from './transactions.component';

@Injectable()
export class ToTransactionsAction extends Action<AppState> {

  constructor(private Router: Router) {
    super();
  }

  create(): this {
    this.createReducer((st: AppState) => {
      st.routeState = TransactionsComponent.routeName;
      return new Promise(async (resolve) => {
        await this.Router.navigate([st.routeState]);
        resolve(st);
      });
    });
    return this;
  }

}
