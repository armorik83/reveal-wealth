import {Injectable} from 'angular2/core';
import {Action} from '../walts-proto';

import {RouteState} from '../app-router-definition';
import {AppState} from '../app.store';

@Injectable()
export class SetCurrentRouteStateAction extends Action<AppState> {

  create(routeState: RouteState): this {
    this.createReducer((curr: AppState, next: AppState) => {
      next.routeState = routeState;
      return Promise.resolve(next);
    });
    return this;
  }

}
