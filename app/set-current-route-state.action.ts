import {Action} from './flux/action';
import {AppState, RouteState} from './app.store';

export class SetCurrentRouteStateAction extends Action<AppState> {
  
  constructor(routeState: RouteState) {
    super((st: AppState) => {
      st.routeState = routeState;
      return Promise.resolve(st);
    });
  }

}