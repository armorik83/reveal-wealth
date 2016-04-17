import {Component, ViewChild, ElementRef} from 'angular2/core';
import {InputFileDirective} from "./input-file.directive";

export const _name = 'ImportData';

@Component({
  selector  : 'rw-import-data',
  directives: [InputFileDirective],
  template  : `
    <input
      input-file
      type="file"
      (result)="onResultInputFile($event)"
    >
    <button
      (click)="onClick()"
      [attr.disabled]="disableImport ? true : null"
     >Import</button>
  `
})
export class ImportDataComponent {
  
  importedCsv: string;
  disableImport: boolean;

  constructor() {
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
  onResultInputFile(result: string) {
    // If it has a no result, button will be disabled.
    this.disableImport = !result;
    this.importedCsv   = result;
  }

}
