import {
  OnInit,
  OnChanges,
  DoCheck,
  OnDestroy,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  ChangeDetectorRef
} from 'angular2/core';

import {SetCurrentRouteStateAction} from './set-current-route-state.action';
import {AppDispatcher} from './app.dispatcher';
import {AppStore, AppState} from './app.store';

export class AbstractComponent implements
  OnInit,
  OnChanges,
  DoCheck,
  OnDestroy,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked {

  protected disposers: Function[] = [];

  ngOnInit(): void              { /* noop */ }
  ngOnChanges(): void           { /* noop */ }
  ngDoCheck(): void             { /* noop */ }
  ngAfterContentInit(): void    { /* noop */ }
  ngAfterContentChecked(): void { /* noop */ }
  ngAfterViewInit(): void       { /* noop */ }
  ngAfterViewChecked(): void    { /* noop */ }

  ngOnDestroy(): void {
    this.disposers.forEach((disposer) => disposer());
  }

}

export class AbstractRootComponent extends AbstractComponent {

  constructor(protected cdRef: ChangeDetectorRef,
              protected Dispatcher: AppDispatcher,
              protected Store: AppStore) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    const disposer = this.Store.onComplete(
      this.cdRef,
      this.storeOnComplete.bind(this)
    );
    this.disposers.push(disposer);
  }

  ngOnChanges(): void           { super.ngOnChanges(); }
  ngDoCheck(): void             { super.ngDoCheck(); }
  ngAfterContentInit(): void    { super.ngAfterContentInit(); }
  ngAfterContentChecked(): void { super.ngAfterContentChecked(); }
  ngAfterViewInit(): void       { super.ngAfterViewInit(); }
  ngAfterViewChecked(): void    { super.ngAfterViewChecked(); }
  ngOnDestroy(): void           { super.ngOnDestroy(); }

  storeOnComplete(st: AppState): void { /* noop */ }

}

export class AbstractRouterComponent extends AbstractComponent {

  constructor(protected cdRef: ChangeDetectorRef,
              protected Dispatcher: AppDispatcher,
              protected Store: AppStore,
              protected SetCurrentRouteStateAction: SetCurrentRouteStateAction) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    const disposer = this.Store.onComplete(
      this.cdRef,
      this.storeOnComplete.bind(this)
    );
    this.disposers.push(disposer);
  }

  ngOnChanges(): void           { super.ngOnChanges(); }
  ngDoCheck(): void             { super.ngDoCheck(); }
  ngAfterContentInit(): void    { super.ngAfterContentInit(); }
  ngAfterContentChecked(): void { super.ngAfterContentChecked(); }
  ngAfterViewInit(): void       { super.ngAfterViewInit(); }
  ngAfterViewChecked(): void    { super.ngAfterViewChecked(); }
  ngOnDestroy(): void           { super.ngOnDestroy(); }

  storeOnComplete(st: AppState): void { /* noop */ }

}
