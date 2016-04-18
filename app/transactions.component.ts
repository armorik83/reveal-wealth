import {Component} from 'angular2/core';

import {AbstractRooterRootComponent} from './abstract-router-root.component';
import {Store, State} from './store';
import {Increment} from './actions/increment';

@Component({
  selector : 'rw-transactions',
  template : `<button (click)="onClick()">increment</button>`
})
export class TransactionsComponent extends AbstractRooterRootComponent {

  static routeName = 'TransactionsComponent';

  constructor(private Store: Store,
              private Increment: Increment) {
    super();

    this.Store.addListenerOnComplete((state: State) => {
      console.log(state);
    });
  }

  onClick(): void {
    this.Increment.run(3);
  }

}
