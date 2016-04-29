import {Component, ChangeDetectorRef} from 'angular2/core';
import {RouterView} from './walts-proto';

import {IncrementAction} from './actions/increment.action';
import {SetCurrentRouteStateAction} from './actions/set-current-route-state.action';
import {AppDispatcher} from './app.dispatcher';
import {AppStore, AppState} from './app.store';
import {BindableMoneyTransaction} from './domain/application/money-transaction/bindable-money-transaction';

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
        <span>{{moneyTransaction.type}}</span>
        <span>{{moneyTransaction.account}}</span>
        <span>{{moneyTransaction.date}}</span>
        <span>{{moneyTransaction.note}}</span>
      </li>
    </ul>
  `
})
export class MoneyTransactionsComponent extends RouterView<AppDispatcher, AppStore, AppState> {

  /* it has the string literal type */
  static routeName: 'MoneyTransactionsComponent' = 'MoneyTransactionsComponent';

  private moneyTransactions: BindableMoneyTransaction[] = [];

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
  wlOnComplete(st: AppState): void {
    console.log(st);
    this.moneyTransactions = st.moneyTransactions;
  }

  /**
   * @return void
   */
  onClick(): void {
    this.Dispatcher.emit(this.IncrementAction.create(1));
    this.Dispatcher.emit(this.IncrementAction.create(1));
    this.Dispatcher.emit(this.IncrementAction.create(1));
    this.Dispatcher.emit(this.IncrementAction.create(1));
    this.Dispatcher.emit(this.IncrementAction.create(1));
  }

}
