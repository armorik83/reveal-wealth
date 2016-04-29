import {Component, ChangeDetectorRef} from 'angular2/core';
import {RouterView} from './walts-proto';

import {routeNames} from './app-router-definition';
import {IncrementAction} from './actions/increment.action';
import {SetCurrentRouteStateAction} from './actions/set-current-route-state.action';
import {InitMoneyTransactionsAction} from './actions/init-money-transactions.action';
import {AppDispatcher} from './app.dispatcher';
import {AppStore, AppState} from './app.store';
import {BindableMoneyTransaction} from './domain/application/money-transaction/bindable-money-transaction';
import {RouteChanger} from './route-changer.service';

@Component({
  selector : 'rw-money-transactions',
  providers: [
    SetCurrentRouteStateAction,
    InitMoneyTransactionsAction,
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
        <span>{{moneyTransaction.date}}</span>
        <span>{{moneyTransaction.account}}</span>
        <span>{{moneyTransaction.amount}}</span>
        <span>{{moneyTransaction.category}}</span>
        <span>{{moneyTransaction.subcategory}}</span>
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
              private InitMoneyTransactionsAction: InitMoneyTransactionsAction,
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
    this.Dispatcher.emit(this.InitMoneyTransactionsAction.create());
  }

  /**
   * @param curr - currentState
   */
  wtStoreHasChanged(curr: AppState): void {
    console.log(curr);
    this.moneyTransactions = curr.moneyTransactions;
  }

  /**
   * @return void
   */
  onClick(): void {
    this.Dispatcher.emit(this.IncrementAction.create(1));
  }

  /**
   * @return void
   */
  onClickEntity(entity: BindableMoneyTransaction): void {
    this.RouteChanger.toMoneyTransactionDetail(entity);
  }

}
