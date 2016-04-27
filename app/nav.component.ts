import {Component} from 'angular2/core';
import {AbstractComponent} from './walts-proto';

import {RouteChanger} from './route-changer.service';

@Component({
  selector : 'rw-nav',
  template : `
    <nav>
      <button (click)="onClickTransactions()">Transactions</button>
      <button (click)="onClickImportData()">ImportData</button>
    </nav>
  `
})
export class NavComponent extends AbstractComponent {

  constructor(private RouteChanger: RouteChanger) {
    super();
  }

  onClickTransactions(): void {
    this.RouteChanger.toTransactions();
  }

  onClickImportData(): void {
    this.RouteChanger.toImportData();
  }

}
