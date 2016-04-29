import {Component, ChangeDetectorRef} from 'angular2/core';
import {RouterView} from './walts-proto';

import {routeNames} from './app-router-definition';
import {IncrementAction} from './actions/increment.action';
import {SetCurrentRouteStateAction} from './actions/set-current-route-state.action';
import {AppDispatcher} from './app.dispatcher';
import {AppStore, AppState} from './app.store';
import {BindableMoneyTransaction} from './domain/application/money-transaction/bindable-money-transaction';
import {RouteChanger} from './route-changer.service';

@Component({
  selector : 'rw-money-transactions',
  providers: [
    SetCurrentRouteStateAction,
    IncrementAction
  ],
  template : `
    <button (click)="onClick()">increment</button>
    <ul>
      <li
        *ngFor="#moneyTransaction of moneyTransactions"
        (click)="onClickEntity(moneyTransaction)"
      >
        <span>{{moneyTransaction.type}}</span>
        <span>{{moneyTransaction.account}}</span>
        <span>{{moneyTransaction.date}}</span>
        <span>{{moneyTransaction.note}}</span>
      </li>
    </ul>
  `
})
export class MoneyTransactionsComponent extends RouterView<AppDispatcher, AppStore, AppState> {

  private moneyTransactions: BindableMoneyTransaction[] = [];

  constructor(protected cdRef: ChangeDetectorRef,
              protected Dispatcher: AppDispatcher,
              protected Store: AppStore,
              private RouteChanger: RouteChanger,
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
      routeNames.MoneyTransactionsComponent
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

  /**
   * @return void
   */
  onClickEntity(entity: BindableMoneyTransaction): void {
    this.RouteChanger.toMoneyTransactionDetail(entity);
  }

}
