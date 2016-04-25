import {Component, ChangeDetectorRef} from 'angular2/core';

import {IncrementAction} from './increment.action';
import {SetCurrentRouteStateAction} from './set-current-route-state.action';
import {AppDispatcher} from './app.dispatcher';
import {AppStore, AppState} from './app.store';

import {AbstractRouterComponent} from './abstract-router.component';

@Component({
  selector : 'rw-transactions',
  providers: [
    SetCurrentRouteStateAction,
    IncrementAction
  ],
  template : `
    <button (click)="onClick()">increment</button>
    <ul>
      <li *ngFor="#moneyTransaction of moneyTransactions">
        <span>{{moneyTransaction.Type}}</span>
        <span>{{moneyTransaction.Date}}</span>
        <span>{{moneyTransaction.Note}}</span>
      </li>
    </ul>
  `
})
export class TransactionsComponent extends AbstractRouterComponent {

  /* it has the string literal type */
  static routeName: 'TransactionsComponent' = 'TransactionsComponent';

  private moneyTransactions: any[] = [];

  constructor(protected AppStore: AppStore,
              protected SetCurrentRouteStateAction: SetCurrentRouteStateAction,
              private cdRef: ChangeDetectorRef,
              private AppDispatcher: AppDispatcher,
              private IncrementAction: IncrementAction) {
    super(AppStore, SetCurrentRouteStateAction);
  }

  /**
   * @return void
   */
  ngOnInit(): void {
    super.ngOnInit();

    const disposer = this.AppStore.onComplete(this.cdRef, (st: AppState) => {
      this.moneyTransactions = st.json;
    });
    this.disposers.push(disposer);

    this.AppDispatcher.emit(this.SetCurrentRouteStateAction.create(
      TransactionsComponent.routeName)
    );
  }

  ngAfterContentChecked(): void {
    console.log('TransactionsComponent ngAfterContentChecked');
  }

  ngAfterViewChecked(): void {
    console.log('TransactionsComponent ngAfterViewChecked');
  }

  /**
   * @return void
   */
  onClick(): void {
    this.AppDispatcher.emit(this.IncrementAction.create(3));
  }

}
