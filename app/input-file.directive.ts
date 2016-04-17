import {Directive, Output, EventEmitter, HostListener} from 'angular2/core';

@Directive({
  selector: 'input[type=file]'
})
export class InputFileDirective {

  @Output() result = new EventEmitter();
  
  /**
   * @param ev
   */
  @HostListener('change', ['$event'])
  onChange(ev: Event): void {
    const file = (<HTMLInputElement>ev.target).files[0];
    if (!file) {
      this.result.emit(null);
      return;
    }

    const fileReader  = new FileReader();
    fileReader.onload = (fileEvent: ProgressEvent) => {
      const result: string = (<any>fileEvent.target).result;
      this.result.emit(result);
    };

    fileReader.readAsText(file);
  }

}
