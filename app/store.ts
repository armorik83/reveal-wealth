import {Injectable} from 'angular2/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/operator/throttleTime';

import {Increment} from './actions/increment';

export class State {
  num: number;
}

@Injectable()
export class Store {

  completeSubject = new Subject();

  state: State = {
    num: 0
  };

  constructor(private Increment: Increment) {
    this.Increment.merge(this.state, () => this.complete());
  }

  addListenerOnComplete(callback: Function): void {
    this.completeSubject
      .throttleTime(1)
      .subscribe(() => callback(this.state));
  }

  complete(): void {
    this.completeSubject.next(null);
  }

}
