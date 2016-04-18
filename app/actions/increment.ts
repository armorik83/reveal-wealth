import {Injectable} from 'angular2/core';

import {AbstractAction} from './abstract-action';
import {State} from '../store';

@Injectable()
export class Increment extends AbstractAction {

  constructor() {
    super();
  }

  /**
   * @return void
   */
  run(n: number): void {
    this.emit((state: State) => {
      state.num = n + state.num;
    });
  }

}
