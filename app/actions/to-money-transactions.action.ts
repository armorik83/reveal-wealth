import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Action, Reducer} from '../walts-proto';

import {routePaths} from '../app-router-definition';
import {AppState} from '../app.store';

@Injectable()
export class ToMoneyTransactionsAction extends Action<AppState> {

  constructor(private Router: Router) {
    super();
  }

  create(): Reducer<AppState> {
    return (state: AppState) => {
      let next = {} as AppState;
      next.routeState = routePaths.MoneyTransactionsComponent;
      return new Promise(async (resolve) => {
        await this.Router.navigate([next.routeState]);
        resolve(this.merge(state, next));
      });
    };
  }

}
