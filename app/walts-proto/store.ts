import {Subject} from 'rxjs/Subject';

import {Dispatcher} from './dispatcher';

type Listener<ST extends State> = (readOnlyCurrentState: ST) => void;

export abstract class State {}

export class Store<ST extends State> {

  private complete = new Subject<ST>();
  private state: ST;

  constructor(initState: ST,
              private Dispatcher: Dispatcher<ST>) {
    this.state = initState;
    this.Dispatcher.subscribe((reducer) => {
      reducer(Object.assign({}, this.state)).then((next) => {
        this.complete.next(next);
      });
    });
  }

  /**
   * @param listener
   * @return Function - disposer
   */
  onComplete(listener: Listener<ST>): Function {
    const disposer = this.complete
      .subscribe((curr: ST) => {
        this.state = curr;
        listener(Object.assign({}, this.state) as ST); // Argument of the listener() is read-only.
      });
    return () => disposer.unsubscribe();
  }

}
