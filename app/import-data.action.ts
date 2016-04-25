import {Injectable} from 'angular2/core';
import * as papaparse from 'papaparse';

import {Action} from './flux/action';
import {AppState} from './app.store';
import {TransactionRepository} from './transaction-repository.service';

export function fn(TransactionRepository: TransactionRepository,
                   csv: string): Promise<any[]> {
  return new Promise((resolve) => {
    const onComplete = async (results: PapaParse.ParseResult) => {
      TransactionRepository.initialize();
      await TransactionRepository.store(results.data);
      resolve(await TransactionRepository.get());
    };

    papaparse.parse(csv, {
      header  : true,
      complete: onComplete
    } as PapaParse.ParseConfig);
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
