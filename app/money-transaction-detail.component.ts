import {Component, ChangeDetectorRef, ElementRef, ViewChild} from '@angular/core';

import {routePaths} from './app-router-definition';
import {SetCurrentRouteStateAction} from './actions/set-current-route-state.action';
import {ChangeCategoryNameAction} from './actions/change-category-name.action';
import {InitMoneyTransactionDetailAction} from './actions/init-money-transaction-detail.action';
import {AppDispatcher} from './app.dispatcher';
import {AppStore} from './app.store';
import {BindableMoneyTransaction} from './domain/application/money-transaction/bindable-money-transaction';

const NEW_CATEGORY = `NEW_CATEGORY`;

@Component({
  selector : 'rw-money-transaction-detail',
  providers: [
    SetCurrentRouteStateAction,
    ChangeCategoryNameAction,
    InitMoneyTransactionDetailAction
  ],
  styles   : [`
    :host {
      display: block;
      height: 100vh;  
      overflow: scroll;
      padding: 32px;
    }
  `],
  template : `
    <div *ngIf="!!moneyTransaction">
      <h1>{{moneyTransaction.date}} {{moneyTransaction.subcategory}}</h1>
      <p>Type: {{moneyTransaction.type}}</p>
      <p>Date: {{moneyTransaction.date}}</p>
      <p>Account: {{moneyTransaction.account}}</p>
      <p>To: {{moneyTransaction.payeePayer}}</p>
      <p>Amount: {{moneyTransaction.amount}}</p>
      <p>Category: {{moneyTransaction.category}}</p>
      <input #${NEW_CATEGORY} [attr.value]="moneyTransaction.category" type="text">
      <button (click)="onClick()">Change</button>
      <p>Subcategory: {{moneyTransaction.subcategory}}</p>
      <p>Note: {{moneyTransaction.note}}</p>
    </div>
  `
})
export class MoneyTransactionDetailComponent {

  private moneyTransaction: BindableMoneyTransaction = null;
  @ViewChild(NEW_CATEGORY) private newCategoryInputRef: ElementRef;

  constructor(private AppDispatcher: AppDispatcher,
              private AppStore: AppStore,
              private ChangeDetectorRef: ChangeDetectorRef,
              private SetCurrentRouteStateAction: SetCurrentRouteStateAction,
              private ChangeCategoryNameAction: ChangeCategoryNameAction,
              private InitMoneyTransactionDetailAction: InitMoneyTransactionDetailAction) {
    // noop
  }

  ngOnInit(): void {
    this.AppDispatcher.emit(this.SetCurrentRouteStateAction.create(
      routePaths.MoneyTransactionDetailComponent
    ));

    this.AppStore.observable.subscribe((state) => {
      console.log(state);
      this.moneyTransaction = state.moneyTransaction;
      this.ChangeDetectorRef.detectChanges();
    });
  }

  onClick(): void {
    // Wait at AAA requestAnimationFrame() reference at the time
    // of the initial click is not stored.
    requestAnimationFrame(() => {
      const newName = this.newCategoryInputRef.nativeElement.value;
      this.AppDispatcher.emit(this.ChangeCategoryNameAction.create(
        this.moneyTransaction,
        newName
      ));
      this.AppDispatcher.emit(this.InitMoneyTransactionDetailAction.create());
    });
  }

}
