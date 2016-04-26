import {Component, ChangeDetectorRef} from 'angular2/core';

import {SetCurrentRouteStateAction} from './set-current-route-state.action';
import {ImportDataAction} from './import-data.action';
import {AppDispatcher} from './app.dispatcher';
import {AppStore, AppState} from './app.store';
import {RouteChanger} from './route-changer.service';

import {AbstractRouterComponent} from './abstract.component';
import {InputFileDirective} from './input-file.directive';
import {MoneyTransactionRepository} from './money-transaction-repository.service.ts';

@Component({
  selector  : 'rw-import-data',
  directives: [InputFileDirective],
  providers : [
    SetCurrentRouteStateAction,
    ImportDataAction,
    MoneyTransactionRepository
  ],
  template  : `
    <input
      type="file"
      (result)="onResultInputFile($event)"
    >

    <button
      (click)="onClickImport()"
      [attr.disabled]="disableImport ? true : null"
    >
      Import
    </button>
  `
})
export class ImportDataComponent extends AbstractRouterComponent {

  /* it has the string literal type */
  static routeName: 'ImportDataComponent' = 'ImportDataComponent';

  importedCsv: string;
  disableImport: boolean;

  constructor(protected cdRef: ChangeDetectorRef,
              protected Dispatcher: AppDispatcher,
              protected Store: AppStore,
              private SetCurrentRouteStateAction: SetCurrentRouteStateAction,
              private RouteChanger: RouteChanger,
              private ImportDataAction: ImportDataAction) {
    super(cdRef, Dispatcher, Store);

    this.importedCsv   = null;
    this.disableImport = true;
  }

  /**
   * @return void
   */
  ngOnInit(): void {
    super.ngOnInit();

    this.Dispatcher.emit(this.SetCurrentRouteStateAction.create(
      ImportDataComponent.routeName
    ));
  }

  /**
   * @return void
   */
  onClickImport(): void {
    if (!this.importedCsv) {
      return;
    }

    this.Dispatcher.emit(this.ImportDataAction.create(this.importedCsv));
    this.RouteChanger.toTransactions();
  }

  /**
   * @param result
   */
  onResultInputFile(result: string): void {
    this.importedCsv = result;

    // If it has a no result, button will be disabled.
    this.disableImport = !result;
  }

}
