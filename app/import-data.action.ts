import {Injectable} from 'angular2/core';
import * as papaparse from 'papaparse';

import {Action} from './flux/action';
import {AppState} from './app.store';

export function fn(csv: string): Promise<any[]> {
  return new Promise((resolve) => {
    papaparse.parse(csv, {
      header  : true,
      complete: (results: PapaParse.ParseResult) => {
        resolve(results.data);
      }
    });
  });
}

@Injectable()
export class ImportDataAction extends Action<AppState> {

  create(csv: string): this {
    this.createReducer(async (st: AppState) => {
      st.json = await fn(csv);
      return Promise.resolve(st);
    });
    return this;
  }

}
