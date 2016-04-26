import {Component, ChangeDetectorRef} from 'angular2/core';

import {IncrementAction} from './increment.action';
import {SetCurrentRouteStateAction} from './set-current-route-state.action';
import {AppDispatcher} from './app.dispatcher';
import {AppStore, AppState} from './app.store';

import {AbstractRouterComponent} from './abstract.component';

@Component({
  selector : 'rw-transactions',
  providers: [
    SetCurrentRouteStateAction,
    IncrementAction
  ],
  template : `
    <button (click)="onClick()">increment</button>
    <ul>
      <li *ngFor="#moneyTransaction of moneyTransactions">
        <span>{{moneyTransaction.Type}}</span>
        <span>{{moneyTransaction.Date}}</span>
        <span>{{moneyTransaction.Note}}</span>
      </li>
    </ul>
  `
})
export class MoneyTransactionsComponent extends AbstractRouterComponent {

  /* it has the string literal type */
  static routeName: 'MoneyTransactionsComponent' = 'MoneyTransactionsComponent';

  private moneyTransactions: any[] = [];

  constructor(protected cdRef: ChangeDetectorRef,
              protected Dispatcher: AppDispatcher,
              protected Store: AppStore,
              private SetCurrentRouteStateAction: SetCurrentRouteStateAction,
              private IncrementAction: IncrementAction) {
    super(cdRef, Dispatcher, Store);
  }

  /**
   * @return void
   */
  ngOnInit(): void {
    super.ngOnInit();

    this.Dispatcher.emit(this.SetCurrentRouteStateAction.create(
      MoneyTransactionsComponent.routeName
    ));
  }

  /**
   * @param st
   */
  storeOnComplete(st: AppState): void {
    this.moneyTransactions = st.json;
  }

  /**
   * @return void
   */
  onClick(): void {
    this.Dispatcher.emit(this.IncrementAction.create(3));
  }

}