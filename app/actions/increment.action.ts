import {Injectable} from '@angular/core';
import {Action, Reducer} from '../walts-proto';

import {AppState} from '../app.store';

export function fn(curr: AppState, n: number): number {
  return n + curr.num;
}

@Injectable()
export class IncrementAction extends Action<AppState> {

  create(n: number): Reducer<AppState> {
    return (state: AppState) => {
      let next = {} as AppState;
      next.num = fn(state, n);
      return Promise.resolve(this.merge(state, next));
    };
  }

}
