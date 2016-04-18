import {Injectable} from 'angular2/core';

import {AbstractAction} from './abstract-action';
import {State} from '../store';

@Injectable()
export class ImportTransactions extends AbstractAction {

  constructor() {
    super();
  }

  /**
   * @return void
   */
  run(): void {
    this.emit((state: State) => {
      // noop
    });
  }

}
