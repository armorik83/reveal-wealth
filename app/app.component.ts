import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';

import {AbstractComponent} from './abstract.component';
import {TransactionsComponent} from './transactions.component';
import {ImportDataComponent} from './import-data.component';

@Component({
  selector  : 'rw-app',
  directives: [ROUTER_DIRECTIVES],
  providers : [ROUTER_PROVIDERS],
  template  : `
    <nav>
      <a [routerLink]="['${TransactionsComponent.routeName}']">Transactions</a>
      <a [routerLink]="['${ImportDataComponent.routeName}']">ImportData</a>
    </nav>
    <router-outlet></router-outlet> 
  `
})
@RouteConfig([
  {path: '/transactions', name: TransactionsComponent.routeName, component: TransactionsComponent, useAsDefault: true},
  {path: '/import',       name: ImportDataComponent.routeName,   component: ImportDataComponent}
])
export class AppComponent extends AbstractComponent {

  constructor() {
    super();
  }

}
