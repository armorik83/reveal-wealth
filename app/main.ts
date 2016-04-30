/// <reference path="../typings/main.d.ts" />

import 'reflect-metadata';
import 'rxjs/Rx';
import 'zone.js/dist/zone';
import 'babel-polyfill/dist/polyfill';

import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {AppComponent} from './app.component';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS
]).catch((err) => console.error(err));
