import {Component} from 'angular2/core';

import {AbstractRooterRootComponent} from './abstract-router-root.component';
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
export class ImportDataComponent extends AbstractRooterRootComponent {

  static routeName = 'ImportDataComponent';

  importedCsv: string;
  disableImport: boolean;

  constructor() {
    super();
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
