import {Component, ViewChild, ElementRef} from 'angular2/core';

export const _name = 'ImportData';

@Component({
  selector: 'rw-import-data',
  template: `
    <input
      type="file"
      (change)="onChange($event)"
    >
    <button (click)="onClick()">Import</button>
  `
})
export class ImportDataComponent {
  
  importedCsv: string;

  constructor() {
    this.clearImportedCsv();
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
   * @param ev
   */
  onChange(ev: Event): void {
    const file = (<HTMLInputElement>ev.target).files[0];
    if (!file) {
      this.clearImportedCsv();
      return;
    }

    const fileReader  = new FileReader();
    const filePromise = new Promise<string>((resolve) => {
      fileReader.onload = (fileEvent: ProgressEvent) => {
        const result: string = (<any>fileEvent.target).result;
        resolve(result);
      };
    });

    fileReader.readAsText(file);

    filePromise.then((fileText: string) => {
      this.importedCsv = fileText;
    });
  }

  /**
   * @return void
   */
  private clearImportedCsv(): void {
    this.importedCsv = null;
  }

}
