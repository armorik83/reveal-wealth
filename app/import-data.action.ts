import {Injectable} from 'angular2/core';
import * as papaparse from 'papaparse';

import {Action} from './flux/action';
import {AppState} from './app.store';
import {TransactionRepository} from './transaction-repository.service';

type ParseResult = PapaParse.ParseResult;
type ParseConfig = PapaParse.ParseConfig;

export function fn(repository: TransactionRepository, csv: string): Promise<any[]> {
  return new Promise((resolve) => {
    const onComplete = async (results: ParseResult) => {
      repository.initialize();
      await repository.store(results.data);
      resolve(await repository.get());
    };

    papaparse.parse(csv, {
      header  : true,
      complete: onComplete
    } as ParseConfig);
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