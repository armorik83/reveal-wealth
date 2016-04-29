import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Action} from '../walts-proto';

import {AppState} from '../app.store';
import {MoneyTransactionsComponent} from '../money-transactions.component';

@Injectable()
export class ToMoneyTransactionsAction extends Action<AppState> {

  constructor(private Router: Router) {
    super();
  }

  create(): this {
    this.createReducer((st: AppState) => {
      st.routeState = MoneyTransactionsComponent.routeName;
      return new Promise(async (resolve) => {
        await this.Router.navigate([st.routeState]);
        resolve(st);
      });
    });
    return this;
  }

}
