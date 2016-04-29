import {Component, ChangeDetectorRef} from 'angular2/core';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';
import {View} from './walts-proto';

import {MoneyTransactionsComponent} from './money-transactions.component';
import {MoneyTransactionDetailComponent} from './money-transaction-detail.component';
import {ImportDataComponent} from './import-data.component';
import {NavComponent} from './nav.component';

import {ToMoneyTransactionsAction} from './actions/to-money-transactions.action';
import {ToMoneyTransactionDetailAction} from './actions/to-money-transaction-detail.action';
import {ToImportDataAction} from './actions/to-import-data.action';
import {AppDispatcher} from './app.dispatcher';
import {AppStore, AppState} from './app.store';
import {RouteChanger} from './route-changer.service';
import {AppDatabaseProvider} from './app-database-provider.service';
import {MoneyTransactionRepository} from './domain/application/money-transaction/money-transaction-repository.service';

@Component({
  selector  : 'rw-app',
  directives: [ROUTER_DIRECTIVES, NavComponent],
  providers : [
    ROUTER_PROVIDERS,
    AppDispatcher,
    AppStore,
    MoneyTransactionRepository,
    RouteChanger,
    AppDatabaseProvider,
    ToMoneyTransactionsAction,
    ToMoneyTransactionDetailAction,
    ToImportDataAction
  ],
  template  : `
    <rw-nav></rw-nav>
    <router-outlet></router-outlet> 
  `
})
@RouteConfig([
  {
    useAsDefault: true,
    path        : '/money-transactions',
    name        : MoneyTransactionsComponent.routeName,
    component   : MoneyTransactionsComponent
  },
  {
    path        : '/money-transaction-detail/:id',
    name        : MoneyTransactionDetailComponent.routeName,
    component   : MoneyTransactionDetailComponent
  },
  {
    path        : '/import',
    name        : ImportDataComponent.routeName,
    component   : ImportDataComponent
  }
])
export class AppComponent extends View<AppDispatcher, AppStore, AppState> {

  constructor(protected cdRef: ChangeDetectorRef,
              protected Dispatcher: AppDispatcher,
              protected Store: AppStore) {
    super(cdRef, Dispatcher, Store);
  }

}
