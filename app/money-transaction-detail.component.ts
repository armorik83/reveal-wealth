import {Component, ChangeDetectorRef} from 'angular2/core';
import {RouterView} from './walts-proto';

import {IncrementAction} from './actions/increment.action';
import {SetCurrentRouteStateAction} from './actions/set-current-route-state.action';
import {AppDispatcher} from './app.dispatcher';
import {AppStore, AppState} from './app.store';
import {BindableMoneyTransaction} from './domain/application/money-transaction/bindable-money-transaction';
import {RouteChanger} from './route-changer.service';

@Component({
  selector : 'rw-money-transaction-detail',
  providers: [
    SetCurrentRouteStateAction,
    IncrementAction
  ],
  template : `
    <span>{{moneyTransaction.type}}</span>
    <span>{{moneyTransaction.account}}</span>
    <span>{{moneyTransaction.date}}</span>
    <span>{{moneyTransaction.note}}</span>
  `
})
export class MoneyTransactionDetailComponent extends RouterView<AppDispatcher, AppStore, AppState> {

  /* it has the string literal type */
  static routeName: 'MoneyTransactionDetailComponent' = 'MoneyTransactionDetailComponent';

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
      MoneyTransactionDetailComponent.routeName
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
