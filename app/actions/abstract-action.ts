import {EventEmitter} from 'angular2/core';
import {State} from "../store";

export type Reducer  = (state: State) => void;
type Observer = (reducer: Reducer) => void;

export class AbstractAction {

  protected emitter = new EventEmitter();

  /**
   * @param state
   * @param complete
   * @return disposer
   */
  merge(state: State, complete: () => void): void {
    this.subscribe((reducer: Reducer) => {
      reducer(state);
      complete();
    });
  }

  protected emit(reducer: Reducer) {
    this.emitter.emit(reducer);
  }

  protected subscribe(observer: Observer) {
    this.emitter.subscribe(observer);
  }
  
}
