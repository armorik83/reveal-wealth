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
      reducer(Promise.resolve(Object.assign({}, this.state) as ST)).then((state) => {
        this.complete.next(state);
      });
    });
  }

  /**
   * @param listener
   * @return Function - disposer
   */
  onComplete(listener: Listener<ST>): Function {
    const disposer = this.complete
      .subscribe((state: ST) => {
        this.state = state;
        listener(Object.assign({}, this.state) as ST); // Argument of the listener() is read-only.
      });
    return () => disposer.unsubscribe();
  }

}
