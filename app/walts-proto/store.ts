import {ChangeDetectorRef} from 'angular2/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/operator/debounceTime';

import {Dispatcher} from './dispatcher';

type Listener<ST extends State> = (st: ST) => void;

export abstract class State {}

export class Store<ST extends State> {

  private complete = new ReplaySubject<ST>();

  constructor(protected state: ST,
              private Dispatcher: Dispatcher<ST>) {
    this.Dispatcher.subscribe((reducer) => {
      reducer(this.state).then((st) => {
        this.complete.next(st);
      });
    });
  }

  /**
   * @param cdRef
   * @param listener
   * @return Function - disposer
   */
  onComplete(cdRef: ChangeDetectorRef, listener: Listener<ST>): Function {
    const disposer = this.complete
      .scan((acc, val) => Object.assign({}, acc, val))
      .debounceTime(1)
      .subscribe((st: ST) => {
        listener(st);
        cdRef.detectChanges();
      });
    return () => disposer.unsubscribe();
  }

}
