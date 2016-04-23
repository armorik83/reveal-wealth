import {Subject} from 'rxjs/Subject';
import 'rxjs/operator/debounceTime';

import {Dispatcher} from './dispatcher';

export type Listener<ST extends State> = (st: ST) => void;

export abstract class State {}

export class Store<ST extends State> {

  private complete = new Subject<ST>();

  constructor(protected state: ST,
              private Dispatcher: Dispatcher<ST>) {
    this.Dispatcher.subscribe((reducer) => {
      this.complete.next(reducer(this.state));
    });
  }

  onComplete(listener: Listener<ST>): void {
    this.complete
      .debounceTime(1)
      .subscribe((st: ST) => listener(st));
  }

}
