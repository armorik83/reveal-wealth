import {Component} from '@angular/core';
import {AbstractComponent} from './walts-proto';

import {colors, sizes} from './style-constants';
import {RouteChanger} from './route-changer.service';

@Component({
  selector: 'rw-nav',
  styles  : [`
    :host {
      background: ${colors.navBackground};
      width: ${sizes.navWidth};
      height: 100vh;
    }
    button {
      color: white;
      font-size: 15px;
      width: 100%;
      padding: 16px;
      transition: background .3s;
    }
    button:hover {
      transition: background .1s;
    }
    .transactions:hover {
      background: ${colors.moneyTransactions};
    }
    .importData:hover {
      background: ${colors.importData};
    }
  `],
  template: `
    <nav>
      <button class="transactions" (click)="onClickTransactions()">Transactions</button>
      <button class="importData"   (click)="onClickImportData()">Import Data</button>
    </nav>
  `
})
export class NavComponent extends AbstractComponent {

  constructor(private RouteChanger: RouteChanger) {
    super();
  }

  onClickTransactions(): void {
    this.RouteChanger.toMoneyTransactions();
  }

  onClickImportData(): void {
    this.RouteChanger.toImportData();
  }

}
