import {Component, ChangeDetectorRef} from '@angular/core';
import {CurrencyPipe} from '@angular/common';

import {routePaths} from './app-router-definition';
import {IncrementAction} from './actions/increment.action';
import {SetCurrentRouteStateAction} from './actions/set-current-route-state.action';
import {InitMoneyTransactionsAction} from './actions/init-money-transactions.action';
import {AppDispatcher} from './app.dispatcher';
import {AppStore} from './app.store';
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
export class MoneyTransactionsComponent {

  private moneyTransactions: BindableMoneyTransaction[] = [];

  constructor(private AppDispatcher: AppDispatcher,
              private AppStore: AppStore,
              private ChangeDetectorRef: ChangeDetectorRef,
              private RouteChanger: RouteChanger,
              private SetCurrentRouteStateAction: SetCurrentRouteStateAction,
              private InitMoneyTransactionsAction: InitMoneyTransactionsAction,
              private IncrementAction: IncrementAction) {
    // noop
  }

  /**
   * @return void
   */
  ngOnInit(): void {
    this.AppDispatcher.emitAll([
      this.SetCurrentRouteStateAction.create(routePaths.MoneyTransactionsComponent),
      this.InitMoneyTransactionsAction.create()
    ]);

    this.AppStore.observable.subscribe((state) => {
      console.log(state);
      this.moneyTransactions = state.moneyTransactions;
      this.ChangeDetectorRef.detectChanges();
    });
  }

  /**
   * @return void
   */
  onClick(): void {
    this.AppDispatcher.emitAll([
      this.IncrementAction.create(1),
      this.IncrementAction.create(1),
      this.IncrementAction.create(1),
      this.IncrementAction.create(1),
      this.IncrementAction.create(1),
      this.IncrementAction.create(1),
      this.IncrementAction.create(1),
      this.IncrementAction.create(1)
    ]);
  }

  /**
   * @return void
   */
  onClickEntity(entity: BindableMoneyTransaction): void {
    this.RouteChanger.toMoneyTransactionDetail(entity);
  }

}
