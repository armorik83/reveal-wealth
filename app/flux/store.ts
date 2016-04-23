import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/operator/debounceTime';

import {Dispatcher} from './dispatcher';

export type Listener<ST extends State> = (st: ST) => void;

export abstract class State {}

export class Store<ST extends State> {

  private complete: BehaviorSubject<ST>;

  constructor(protected state: ST,
              private Dispatcher: Dispatcher<ST>) {
    this.complete = new BehaviorSubject<ST>(state);

    this.Dispatcher.subscribe((reducer) => {
      reducer(this.state).then((st) => {
        this.complete.next(st);
      });
    });
  }

  /**
   * @param listener
   * @return Function = disposer
   */
  onComplete(listener: Listener<ST>): Function {
    this.complete
      .debounceTime(1)
      .subscribe((st: ST) => listener(st));

    return () => this.complete.unsubscribe();
  }

}
