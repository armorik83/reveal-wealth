import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Action} from '../walts-proto';

import {routeNames} from '../app-router-definition';
import {AppState} from '../app.store';

@Injectable()
export class ToImportDataAction extends Action<AppState> {

  constructor(private Router: Router) {
    super();
  }

  create(): this {
    this.createReducer((curr: AppState, next: AppState) => {
      next.routeState = routeNames.ImportDataComponent;
      return new Promise(async (resolve) => {
        await this.Router.navigate([next.routeState]);
        resolve(next);
      });
    });
    return this;
  }

}
