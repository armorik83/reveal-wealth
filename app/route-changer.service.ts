import {Injectable} from 'angular2/core';

import {AppDispatcher} from './app.dispatcher';
import {ToMoneyTransactionsAction} from './actions/to-money-transactions.action';
import {ToMoneyTransactionDetailAction} from './actions/to-money-transaction-detail.action';
import {ToImportDataAction} from './actions/to-import-data.action';
import {BindableMoneyTransaction} from './domain/application/money-transaction/bindable-money-transaction';

@Injectable()
export class RouteChanger {

  constructor(private AppDispatcher: AppDispatcher,
              private ToMoneyTransactionsAction: ToMoneyTransactionsAction,
              private ToMoneyTransactionDetailAction: ToMoneyTransactionDetailAction,
              private ToImportDataAction: ToImportDataAction) {
    // noop
  }

  toMoneyTransactions(): void {
    this.AppDispatcher.emit(this.ToMoneyTransactionsAction.create());
  }

  toMoneyTransactionDetail(entity: BindableMoneyTransaction): void {
    this.AppDispatcher.emit(this.ToMoneyTransactionDetailAction.create(entity));
  }

  toImportData(): void {
    this.AppDispatcher.emit(this.ToImportDataAction.create());
  }

}
