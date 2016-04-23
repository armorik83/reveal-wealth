import {Component} from 'angular2/core';

import {AbstractRouterComponent} from './abstract-router.component';
import {AppDispatcher} from './app.dispatcher';
import {AppStore, AppState} from './app.store';
import {InputFileDirective} from './input-file.directive';
import {RouteChanger} from './route-changer.service';

@Component({
  selector  : 'rw-import-data',
  directives: [InputFileDirective],
  providers : [AppDispatcher, AppStore, RouteChanger],
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
              private RouteChanger: RouteChanger) {
    super(AppStore);
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
  }

  /**
   * @return void
   */
  onClickImport(): void {
    if (!this.importedCsv) {
      return;
    }

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
