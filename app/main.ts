/// <reference path="../typings/main.d.ts" />

import 'reflect-metadata';
import 'rxjs/Rx';
import 'zone.js/dist/zone';
import 'babel-polyfill/dist/polyfill';

import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router';

import {AppComponent} from './app.component';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS
]).catch((err) => console.error(err));
