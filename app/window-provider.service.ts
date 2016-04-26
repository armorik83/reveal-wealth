import {Injectable} from 'angular2/core';

@Injectable()
export class WindowProvider {

  getWindow(): Window {
    return window;
  }

}