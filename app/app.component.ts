import {Component, ChangeDetectorRef} from 'angular2/core';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';

import {AbstractRootComponent} from './abstract.component';
import {MoneyTransactionsComponent} from './money-transactions.component.ts';
import {ImportDataComponent} from './import-data.component';
import {NavComponent} from './nav.component';
import {AppDispatcher} from './app.dispatcher';
import {AppStore, AppState} from './app.store';
import {RouteChanger} from './route-changer.service';
import {ToMoneyTransactionsAction} from './to-money-transactions.action.ts';
import {ToImportDataAction} from './to-import-data.action';

@Component({
  selector  : 'rw-app',
  directives: [ROUTER_DIRECTIVES, NavComponent],
  providers : [
    ROUTER_PROVIDERS,
    AppDispatcher,
    AppStore,
    RouteChanger,
    ToMoneyTransactionsAction,
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
    path        : '/import',
    name        : ImportDataComponent.routeName,
    component   : ImportDataComponent
  }
])
export class AppComponent extends AbstractRootComponent {

  constructor(protected cdRef: ChangeDetectorRef,
              protected Dispatcher: AppDispatcher,
              protected Store: AppStore) {
    super(cdRef, Dispatcher, Store);
  }

}

