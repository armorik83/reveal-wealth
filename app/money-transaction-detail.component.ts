import {Component, ChangeDetectorRef, ElementRef, ViewChild} from 'angular2/core';
import {RouterView} from './walts-proto';

import {routeNames} from './app-router-definition';
import {SetCurrentRouteStateAction} from './actions/set-current-route-state.action';
import {ChangeCategoryNameAction} from './actions/change-category-name.action';
import {InitMoneyTransactionDetailAction} from './actions/init-money-transaction-detail.action';
import {AppDispatcher} from './app.dispatcher';
import {AppStore, AppState} from './app.store';
import {BindableMoneyTransaction} from './domain/application/money-transaction/bindable-money-transaction';

const NEW_CATEGORY = `NEW_CATEGORY`;

@Component({
  selector : 'rw-money-transaction-detail',
  providers: [
    SetCurrentRouteStateAction,
    ChangeCategoryNameAction,
    InitMoneyTransactionDetailAction
  ],
  template : `
    <div *ngIf="!!moneyTransaction">
      <span>{{moneyTransaction.type}}</span>
      <span>{{moneyTransaction.date}}</span>
      <span>{{moneyTransaction.account}}</span>
      <span>{{moneyTransaction.amount}}</span>
      <span>{{moneyTransaction.category}}</span>
      <span>{{moneyTransaction.subcategory}}</span>
      <span>{{moneyTransaction.note}}</span>
      <input #${NEW_CATEGORY} [attr.value]="moneyTransaction.category" type="text">
      <button (click)="onClick()"></button>
    </div>
  `
})
export class MoneyTransactionDetailComponent extends RouterView<AppDispatcher, AppStore, AppState> {

  private moneyTransaction: BindableMoneyTransaction = null;
  @ViewChild(NEW_CATEGORY) private newCategoryInputRef: ElementRef;

  constructor(protected cdRef: ChangeDetectorRef,
              protected Dispatcher: AppDispatcher,
              protected Store: AppStore,
              private SetCurrentRouteStateAction: SetCurrentRouteStateAction,
              private ChangeCategoryNameAction: ChangeCategoryNameAction,
              private InitMoneyTransactionDetailAction: InitMoneyTransactionDetailAction) {
    super(cdRef, Dispatcher, Store);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.Dispatcher.emit(this.SetCurrentRouteStateAction.create(
      routeNames.MoneyTransactionDetailComponent
    ));
  }

  wtStoreHasChanged(curr: AppState): void {
    console.log(curr);
    this.moneyTransaction = curr.moneyTransaction;
  }

  onClick(): void {
    // Wait at AAA requestAnimationFrame() reference at the time
    // of the initial click is not stored.
    requestAnimationFrame(() => {
      const newName = this.newCategoryInputRef.nativeElement.value;
      this.Dispatcher.emit(this.ChangeCategoryNameAction.create(
        this.moneyTransaction,
        newName
      ));
      this.Dispatcher.emit(this.InitMoneyTransactionDetailAction.create());
    });
  }

}
