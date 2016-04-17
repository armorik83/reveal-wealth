import {Component} from 'angular2/core';

import {AbstractRooterRootComponent} from './abstract-router-root.component';

@Component({
  selector: 'rw-transactions',
  template: `TransactionsComponent`
})
export class TransactionsComponent extends AbstractRooterRootComponent {

  static routeName = 'TransactionsComponent';

  constructor() {
    super();
  }

}
