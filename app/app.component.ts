import {Component, ChangeDetectorRef} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes} from '@angular/router';

import {colors, sizes, includes} from './style-constants';
import {routePaths} from './app-router-definition';
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
import {CategoryRepository} from './domain/application/category/category-repository';

@Component({
  selector  : 'rw-app',
  directives: [ROUTER_DIRECTIVES, NavComponent],
  providers : [
    AppDispatcher,
    AppStore,
    MoneyTransactionRepository,
    CategoryRepository,
    RouteChanger,
    AppDatabaseProvider,
    ToMoneyTransactionsAction,
    ToMoneyTransactionDetailAction,
    ToImportDataAction
  ],
  styles    : [`
    :host {
      display: flex;
      background: ${colors.contentsBackground};
    }
    .contents {
      ${includes.contentsBorderLeft(colors.contentsBackground)};
      width: ${sizes.contentsWidth};
    }
    .contents.moneyTransactions {
      ${includes.contentsBorderLeft(colors.moneyTransactions)};
    }
    .contents.transactionDetail {
      ${includes.contentsBorderLeft(colors.moneyTransactionDetail)};
    }
    .contents.importData {
      ${includes.contentsBorderLeft(colors.importData)};
    }
  `],
  template  : `
    <rw-nav></rw-nav>
    <div
      class="contents"
      [class.moneyTransactions]="isMoneyTransactions"
      [class.transactionDetail]="isMoneyTransactionDetail"
      [class.importData]       ="isImport"
    >
      <router-outlet></router-outlet> 
    </div>
  `
})
@Routes([
  {path: routePaths.MoneyTransactionsComponent,      component: MoneyTransactionsComponent},
  {path: routePaths.MoneyTransactionDetailComponent, component: MoneyTransactionDetailComponent},
  {path: routePaths.ImportDataComponent,             component: ImportDataComponent}
])
export class AppComponent {

  isMoneyTransactions: boolean;
  isMoneyTransactionDetail: boolean;
  isImport: boolean;

  constructor(private AppDispatcher: AppDispatcher,
              private AppStore: AppStore,
              private ChangeDetectorRef: ChangeDetectorRef) {
    // noop
  }

  waltsStoreHasChanged(curr: AppState): void {
    this.isMoneyTransactions      = curr.routeState === routePaths.MoneyTransactionsComponent;
    this.isMoneyTransactionDetail = curr.routeState === routePaths.MoneyTransactionDetailComponent;
    this.isImport                 = curr.routeState === routePaths.ImportDataComponent;
  }

}
