import {Component} from 'angular2/core';

import {SetCurrentRouteStateAction} from './set-current-route-state.action';
import {ImportDataAction} from './import-data.action';
import {AppDispatcher} from './app.dispatcher';
import {AppStore, AppState} from './app.store';
import {RouteChanger} from './route-changer.service';

import {AbstractRouterComponent} from './abstract-router.component';
import {InputFileDirective} from './input-file.directive';

@Component({
  selector  : 'rw-import-data',
  directives: [InputFileDirective],
  providers : [
    AppDispatcher,
    AppStore,
    SetCurrentRouteStateAction,
    ImportDataAction
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

  constructor(protected AppStore: AppStore,
              protected SetCurrentRouteStateAction: SetCurrentRouteStateAction,
              private AppDispatcher: AppDispatcher,
              private RouteChanger: RouteChanger,
              private ImportDataAction: ImportDataAction) {
    super(AppStore, SetCurrentRouteStateAction);

    this.importedCsv   = null;
    this.disableImport = true;
  }

  /**
   * @return void
   */
  ngOnInit(): void {
    super.ngOnInit();

    this.AppStore.onComplete((st: AppState) => {
      console.log(st);
    });

    this.AppDispatcher.emit(this.SetCurrentRouteStateAction.create(
      ImportDataComponent.routeName)
    );
  }

  /**
   * @return void
   */
  onClickImport(): void {
    if (!this.importedCsv) {
      return;
    }

    this.AppDispatcher.emit(this.ImportDataAction.create(this.importedCsv));
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
