import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Action} from '../walts-proto';

import {routePaths} from '../app-router-definition';
import {AppState} from '../app.store';

@Injectable()
export class ToMoneyTransactionsAction extends Action<AppState> {

  constructor(private Router: Router) {
    super();
  }

  create(): this {
    this.createReducer((curr: AppState) => {
      let next = {} as AppState;
      next.routeState = routePaths.MoneyTransactionsComponent;
      return new Promise(async (resolve) => {
        await this.Router.navigate([next.routeState]);
        resolve(this.merge(curr, next));
      });
    });
    return this;
  }

}
