import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/operator/debounceTime';

import {Dispatcher} from './dispatcher';

export type Listener<ST extends State> = (st: ST) => void;

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
  onComplete(cdRef: any, listener: Listener<ST>): Function {
    const disposer = this.complete
      .debounceTime(1)
      .subscribe((st: ST) => {
        listener(st);
        cdRef.detectChanges();
      });
    return () => disposer.unsubscribe();
  }

}
