import {Component} from 'angular2/core';

import {IncrementAction} from './increment.action';
import {AppDispatcher} from './app.dispatcher';
import {AppStore, AppState} from './app.store';

import {AbstractRouterComponent} from './abstract-router.component';

@Component({
  selector : 'rw-transactions',
  template : `<button (click)="onClick()">increment</button>`
})
export class TransactionsComponent extends AbstractRouterComponent {

  static routeName = 'TransactionsComponent';

  constructor(private AppDispatcher: AppDispatcher,
              private AppStore: AppStore) {
    super();

    this.AppStore.onComplete((st: AppState) => {
      console.log(st);
    });
  }

  onClick(): void {
    this.AppDispatcher.emit(new IncrementAction(3));
  }

}
