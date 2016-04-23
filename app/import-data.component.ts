import {Component} from 'angular2/core';

import {AbstractRouterComponent} from './abstract-router.component';
import {AppStore} from './app.store';
import {InputFileDirective} from './input-file.directive';

@Component({
  selector  : 'rw-import-data',
  directives: [InputFileDirective],
  template  : `
    <input
      type="file"
      (result)="onResultInputFile($event)"
    >

    <button
      (click)="onClick()"
      [attr.disabled]="disableImport ? true : null"
    >
      Import
    </button>
  `
})
export class ImportDataComponent extends AbstractRouterComponent {

  static routeName = 'ImportDataComponent';

  importedCsv: string;
  disableImport: boolean;

  constructor(protected AppStore: AppStore) {
    super(AppStore);
    this.importedCsv   = null;
    this.disableImport = true;
  }

  /**
   * @return void
   */
  onClick(): void {
    if (!this.importedCsv) {
      return;
    }

    console.log(this.importedCsv);
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
