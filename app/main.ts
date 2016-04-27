/// <reference path="../typings/main.d.ts" />

import 'reflect-metadata';
import 'rxjs/Rx';
import 'zone.js/dist/zone';
import 'babel-polyfill/dist/polyfill';

import {bootstrap} from 'angular2/platform/browser';

import {AppComponent} from './app.component';

bootstrap(AppComponent);
