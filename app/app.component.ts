import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';

import {AbstractComponent} from './abstract.component';
import {TransactionsComponent} from './transactions.component';
import {ImportDataComponent} from './import-data.component';
import {NavComponent} from './nav.component';
import {AppDispatcher} from './app.dispatcher';
import {AppStore} from './app.store';

@Component({
  selector  : 'rw-app',
  directives: [ROUTER_DIRECTIVES, NavComponent],
  providers : [ROUTER_PROVIDERS, AppDispatcher, AppStore],
  template  : `
    <rw-nav></rw-nav>
    <router-outlet></router-outlet> 
  `
})
@RouteConfig([
  {path: '/transactions', name: TransactionsComponent.routeName, component: TransactionsComponent, useAsDefault: true},
  {path: '/import',       name: ImportDataComponent.routeName,   component: ImportDataComponent}
])
export class AppComponent extends AbstractComponent {

  constructor(private AppDispatcher: AppDispatcher,
              private AppStore: AppStore) {
    super();
  }

}

