import {Injectable} from 'angular2/core';
import * as papaparse from 'papaparse';

import {Action} from './flux/action';
import {AppState} from './app.store';
import {TransactionRepository} from './transaction-repository.service';

export function fn(TransactionRepository: TransactionRepository,
                   csv: string): Promise<any[]> {
  return new Promise((resolve) => {
    papaparse.parse(csv, {
      header  : true,
      complete: (results: PapaParse.ParseResult) => { 
        TransactionRepository.store(results.data);
        TransactionRepository.get().then(result => resolve(result));
      }
    });
  });
}

@Injectable()
export class ImportDataAction extends Action<AppState> {

  constructor(private TransactionRepository: TransactionRepository) {
    super();
  }

  create(csv: string): this {
    this.createReducer(async (st: AppState) => {
      st.json = await fn(this.TransactionRepository, csv);
      return Promise.resolve(st);
    });
    return this;
  }

}
