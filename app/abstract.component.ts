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

export class AbstractComponent implements OnInit, OnChanges, DoCheck, OnDestroy, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {

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
    // noop
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
