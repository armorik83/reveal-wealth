import {Action} from './flux/action';
import {AppState} from './app.store';

export function fn(st: AppState, n: number): number {
  return n + st.num;
}

export class IncrementAction extends Action<AppState> {

  constructor(n: number) {
    super((st: AppState) => {
      st.num = fn(st, n);
      return Promise.resolve(st);
    });
  }

}
