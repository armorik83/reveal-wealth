import {Component} from 'angular2/core';

import {IncrementAction} from './increment.action';
import {SetCurrentRouteStateAction} from './set-current-route-state.action';
import {AppDispatcher} from './app.dispatcher';
import {AppStore, AppState} from './app.store';

import {AbstractRouterComponent} from './abstract-router.component';

@Component({
  selector : 'rw-transactions',
  providers: [
    AppDispatcher,
    AppStore,
    SetCurrentRouteStateAction,
    IncrementAction
  ],
  template : `
    <button (click)="onClick()">increment</button>
  `
})
export class TransactionsComponent extends AbstractRouterComponent {

  /* it has the string literal type */
  static routeName: 'TransactionsComponent' = 'TransactionsComponent';

  constructor(protected AppStore: AppStore,
              protected SetCurrentRouteStateAction: SetCurrentRouteStateAction,
              private AppDispatcher: AppDispatcher,
              private IncrementAction: IncrementAction) {
    super(AppStore, SetCurrentRouteStateAction);
  }

  /**
   * @return void
   */
  ngOnInit(): void {
    super.ngOnInit();

    const disposer = this.AppStore.onComplete((st: AppState) => {
      console.log(st);
    });
    this.disposers.push(disposer);

    this.AppDispatcher.emit(this.SetCurrentRouteStateAction.create(
      TransactionsComponent.routeName)
    );
  }

  /**
   * @return void
   */
  onClick(): void {
    this.AppDispatcher.emit(this.IncrementAction.create(3));
  }

}
