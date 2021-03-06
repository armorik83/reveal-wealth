import {Component, ChangeDetectorRef} from '@angular/core';

import {routePaths} from './app-router-definition';
import {SetCurrentRouteStateAction} from './actions/set-current-route-state.action';
import {ImportDataAction} from './actions/import-data.action';
import {AppDispatcher} from './app.dispatcher';
import {AppStore} from './app.store';
import {RouteChanger} from './route-changer.service';
import {InputFileDirective} from './input-file.directive';
import {ImportFacade} from './import-facade.service';

@Component({
  selector  : 'rw-import-data',
  directives: [InputFileDirective],
  providers : [
    SetCurrentRouteStateAction,
    ImportDataAction,
    ImportFacade
  ],
  styles    : [`
    :host {
      display: block;
      height: 100vh;  
      overflow: scroll;
      padding: 32px;
    }
  `],
  template  : `
    <h1>Import Data</h1>
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
export class ImportDataComponent {

  importedCsv: string;
  disableImport: boolean;

  constructor(private AppDispatcher: AppDispatcher,
              private AppStore: AppStore,
              private ChangeDetectorRef: ChangeDetectorRef,
              private SetCurrentRouteStateAction: SetCurrentRouteStateAction,
              private RouteChanger: RouteChanger,
              private ImportDataAction: ImportDataAction) {
    this.importedCsv   = null;
    this.disableImport = true;
  }

  /**
   * @return void
   */
  ngOnInit(): void {
    this.AppDispatcher.emit(this.SetCurrentRouteStateAction.create(
      routePaths.ImportDataComponent
    ));

    this.AppStore.observable.subscribe((state) => {
      console.log(state);
      this.ChangeDetectorRef.detectChanges();
    });
  }

  /**
   * @return void
   */
  onClickImport(): void {
    if (!this.importedCsv) {
      return;
    }

    this.AppDispatcher.emit(this.ImportDataAction.create(this.importedCsv));
    this.RouteChanger.toMoneyTransactions();
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
