import {Injectable} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {Action} from '../walts-proto';

import {routeNames} from '../app-router-definition';
import {AppState} from '../app.store';

@Injectable()
export class ToMoneyTransactionsAction extends Action<AppState> {

  constructor(private Router: Router) {
    super();
  }

  create(): this {
    this.createReducer((curr: AppState, next: AppState) => {
      next.routeState = routeNames.MoneyTransactionsComponent;
      return new Promise(async (resolve) => {
        await this.Router.navigate([next.routeState]);
        resolve(next);
      });
    });
    return this;
  }

}
