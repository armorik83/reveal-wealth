import {Subject} from 'rxjs/Subject';

import {Action, Reducer, AsyncReducer} from './action';
import {State} from './store';

export class Dispatcher<ST extends State> {

  private subject = new Subject<AsyncReducer<ST>>();

  emit(action: Action<ST>): void {
    this.emitAll([action]);
  }

  emitAll(actions: Action<ST>[]): void {
    const asyncReducer = actions
      .map((action) => action.reducer)
      .map((f: Reducer<ST>) => (p: Promise<ST>) => p.then(f))
      .reduce((f: AsyncReducer<ST>, g: AsyncReducer<ST>) => (p: Promise<ST>) => g(f(p)))
    ;
    this.subject.next(asyncReducer);
  }

  subscribe(observer: (asyncReducer: AsyncReducer<ST>) => void): void {
    this.subject.subscribe((asyncReducer) => {
      observer(asyncReducer);
    });
  }

}
