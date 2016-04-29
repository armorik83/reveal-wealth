import {Component, ChangeDetectorRef} from 'angular2/core';
import {RouterView} from './walts-proto';

import {routeNames} from './app-router-definition';
import {IncrementAction} from './actions/increment.action';
import {SetCurrentRouteStateAction} from './actions/set-current-route-state.action';
import {AppDispatcher} from './app.dispatcher';
import {AppStore, AppState} from './app.store';
import {BindableMoneyTransaction} from './domain/application/money-transaction/bindable-money-transaction';

@Component({
  selector : 'rw-money-transaction-detail',
  providers: [
    SetCurrentRouteStateAction,
    IncrementAction
  ],
  template : `
    <div *ngIf="!!moneyTransaction">
      <span>{{moneyTransaction.type}}</span>
      <span>{{moneyTransaction.date}}</span>
      <span>{{moneyTransaction.account}}</span>
      <span>{{moneyTransaction.amount}}</span>
      <span>{{moneyTransaction.category}}</span>
      <span>{{moneyTransaction.subcategory}}</span>
      <span>{{moneyTransaction.note}}</span>
    </div>
  `
})
export class MoneyTransactionDetailComponent extends RouterView<AppDispatcher, AppStore, AppState> {

  private moneyTransaction: BindableMoneyTransaction = null;

  constructor(protected cdRef: ChangeDetectorRef,
              protected Dispatcher: AppDispatcher,
              protected Store: AppStore,
              private SetCurrentRouteStateAction: SetCurrentRouteStateAction) {
    super(cdRef, Dispatcher, Store);
  }

  /**
   * @return void
   */
  ngOnInit(): void {
    super.ngOnInit();

    this.Dispatcher.emit(this.SetCurrentRouteStateAction.create(
      routeNames.MoneyTransactionDetailComponent
    ));
  }

  /**
   * @param st
   */
  wlOnComplete(st: AppState): void {
    console.log(st);
    this.moneyTransaction = st.moneyTransaction;
  }

}
