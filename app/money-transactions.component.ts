import {Component, ChangeDetectorRef} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
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
  pipes    : [
    CurrencyPipe
  ],
  styles  : [`
    :host {
      display: block;
      height: 100vh;  
      overflow: scroll;
      padding: 32px;
    }
    table {
      width: 100%;
    }
    tr {
      cursor: pointer;
      background-color: transparent;
      transition: background-color .3s;
    }
    tr:hover {
      background-color: #DFE2E7;
      transition: background-color .1s;
    }
    td {
      padding: 8px;
      border-bottom: 1px solid #BCC2CD;
      transition: border-color .3s;
    }
    tr:hover td {
      border-bottom: 1px solid #7B818C;
      transition: border-color .1s;
    }
  `],
  template : `
    <h1>Transactions</h1>
    <button (click)="onClick()">increment</button>
    <table>
      <tr
        *ngFor="let moneyTransaction of moneyTransactions"
        (click)="onClickEntity(moneyTransaction)"
      >
        <td>{{moneyTransaction.type}}</td>
        <td>{{moneyTransaction.date}}</td>
        <td>{{moneyTransaction.account}}</td>
        <td style="text-align: right">{{moneyTransaction.amount | currency: 'JPY' : false}}</td>
        <td>{{moneyTransaction.category}}</td>
        <td>{{moneyTransaction.subcategory}}</td>
        <td style="width: 40%">{{moneyTransaction.note}}</td>
      </tr>
    </table>
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
