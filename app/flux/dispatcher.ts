import {Subject} from 'rxjs/Subject';

import {Action, Reducer} from './action';
import {State} from './store';

export class Dispatcher<ST extends State> {

  private subject = new Subject<Reducer<ST>>();

  emit(action: Action<ST>): void {
    this.subject.next(action.reducer);
  }

  subscribe(observer: (reducer: Reducer<ST>) => void): void {
    this.subject.subscribe((reducer) => {
      observer(reducer);
    });
  }

}
