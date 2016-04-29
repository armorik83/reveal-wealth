import {SimpleChange, ChangeDetectorRef} from 'angular2/core';
import {Dispatcher} from './dispatcher';
import {Store, State} from './store';

export interface StoreHasChanged<STT extends State> {
  wtStoreHasChanged(st: STT): void;
}

export class AbstractComponent {

  protected wtDisposers: Function[] = [];

  ngOnInit(): any {
    // noop
  }

  ngOnChanges(changes: {[key: string]: SimpleChange}): any {
    // noop
  }

  ngDoCheck(): any {
    // noop
  }

  ngOnDestroy(): any {
    this.wtDisposers.forEach((disposer) => disposer());
  }

  ngAfterContentInit(): any {
    // noop
  }

  ngAfterContentChecked(): any {
    // noop
  }

  ngAfterViewInit(): any {
    // noop
  }

  ngAfterViewChecked(): any {
    // noop
  }

}

export class View<
  D extends Dispatcher<STT>,
  STR extends Store<STT>,
  STT extends State
  > extends AbstractComponent implements StoreHasChanged<STT> {

  constructor(protected cdRef: ChangeDetectorRef,
              protected Dispatcher: D,
              protected Store: STR) {
    super();
  }

  ngOnInit(): any {
    super.ngOnInit();

    const disposer = this.Store.onComplete(
      this.cdRef,
      this.wtStoreHasChanged.bind(this)
    );
    this.wtDisposers.push(disposer);
  }

  ngOnChanges(changes: {[key: string]: SimpleChange}): any {
    super.ngOnChanges(changes);
  }

  ngDoCheck(): any {
    super.ngDoCheck();
  }

  ngOnDestroy(): any {
    super.ngOnDestroy();
  }

  ngAfterContentInit(): any {
    super.ngAfterContentInit();
  }

  ngAfterContentChecked(): any {
    super.ngAfterContentChecked();
  }

  ngAfterViewInit(): any {
    super.ngAfterViewInit();
  }

  ngAfterViewChecked(): any {
    super.ngAfterViewChecked();
  }

  wtStoreHasChanged(st: STT): void {
    // noop
  }

}

export class RouterView<
  D extends Dispatcher<STT>,
  STR extends Store<STT>,
  STT extends State
  > extends AbstractComponent implements StoreHasChanged<STT> {

  constructor(protected cdRef: ChangeDetectorRef,
              protected Dispatcher: D,
              protected Store: STR) {
    super();
  }

  ngOnInit(): any {
    super.ngOnInit();

    const disposer = this.Store.onComplete(
      this.cdRef,
      this.wtStoreHasChanged.bind(this)
    );
    this.wtDisposers.push(disposer);
  }

  ngOnChanges(changes: {[key: string]: SimpleChange}): any {
    super.ngOnChanges(changes);
  }

  ngDoCheck(): any {
    super.ngDoCheck();
  }

  ngAfterContentInit(): any {
    super.ngAfterContentInit();
  }

  ngAfterContentChecked(): any {
    super.ngAfterContentChecked();
  }

  ngAfterViewInit(): any {
    super.ngAfterViewInit();
  }

  ngAfterViewChecked(): any {
    super.ngAfterViewChecked();
  }

  ngOnDestroy(): any {
    super.ngOnDestroy();
  }

  wtStoreHasChanged(st: STT): any {
    // noop
  }

}
