import {Injectable} from 'angular2/core';
import {Action} from './walts-proto';

import {AppState} from './app.store';

export function fn(st: AppState, n: number): number {
  return n + st.num;
}

@Injectable()
export class IncrementAction extends Action<AppState> {

  create(n: number): this {
    this.createReducer((st: AppState) => {
      st.num = fn(st, n);
      return Promise.resolve(st);
    });
    return this;
  }

}
