import {
  OnInit,
  OnChanges,
  DoCheck,
  OnDestroy,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked
} from 'angular2/core';

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

  constructor() {
    // noop
  }

  ngOnInit(): void {
    // noop
  }

  ngOnChanges(): void {
    // noop
  }

  ngDoCheck(): void {
    // noop
  }

  ngOnDestroy(): void {
    this.disposers.forEach((disposer) => disposer());
  }

  ngAfterContentInit(): void {
    // noop
  }

  ngAfterContentChecked(): void {
    // noop
  }

  ngAfterViewInit(): void {
    // noop
  }

  ngAfterViewChecked(): void {
    // noop
  }

}
