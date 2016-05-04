import {Injectable} from '@angular/core';
import {Action} from '../walts-proto';

import {AppState} from '../app.store';

export function fn(curr: AppState, n: number): number {
  return n + curr.num;
}

@Injectable()
export class IncrementAction extends Action<AppState> {

  create(n: number): this {
    this.createReducer((curr: AppState, next: AppState) => {
      next.num = fn(curr, n);
      return Promise.resolve(next);
    });
    return this;
  }

}
