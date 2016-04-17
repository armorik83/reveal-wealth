import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';

import {TransactionsComponent, _name as TransactionsComponentName} from './transactions.component';
import {ImportDataComponent, _name as ImportDataComponentName} from './import-data.component';

@Component({
  selector  : 'rw-app',
  directives: [ROUTER_DIRECTIVES],
  providers : [ROUTER_PROVIDERS],
  template  : `
    <nav>
      <a [routerLink]="['${TransactionsComponentName}']">Transactions</a>
      <a [routerLink]="['${ImportDataComponentName}']">ImportData</a>
    </nav>
    <router-outlet></router-outlet> 
  `
})
@RouteConfig([
  {
    path        : '/transactions',
    name        : TransactionsComponentName,
    component   : TransactionsComponent,
    useAsDefault: true
  },
  {
    path     : '/import',
    name     : ImportDataComponentName,
    component: ImportDataComponent
  }
])
export class AppComponent {
}
