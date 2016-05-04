import {Dispatcher} from './dispatcher';
import {Store, State} from './store';

export class View<D extends Dispatcher<STT>, STR extends Store<STT>, STT extends State> {

  constructor(protected Dispatcher: D,
              protected Store: STR) {
    // noop
  }

}
