import {Injectable} from '@angular/core';
import {Action} from '../walts-proto';

import {RouteState} from '../app-router-definition';
import {AppState} from '../app.store';

@Injectable()
export class SetCurrentRouteStateAction extends Action<AppState> {

  create(routeState: RouteState): this {
    this.createReducer((curr: AppState) => {
      let next = {} as AppState;
      next.routeState = routeState;
      return Promise.resolve(this.merge(curr, next));
    });
    return this;
  }

}
