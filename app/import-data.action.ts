import {Injectable} from 'angular2/core';
import * as papaparse from 'papaparse';
import {Action} from './walts-proto';

import {AppState} from './app.store';
import {ImportFacade} from './import-facade.service';
import {MoneyTransactionRepository} from './domain/application/money-transaction/money-transaction-repository.service';

type ParseResult = PapaParse.ParseResult;
type ParseConfig = PapaParse.ParseConfig;

export function fn(ImportFacade: ImportFacade,
                   MoneyTransactionRepository: MoneyTransactionRepository,
                   csv: string): Promise<any[]> {
  return new Promise((resolve) => {
    const onComplete = async (results: ParseResult) => {
      await ImportFacade.normalize(results.data);
      resolve(await MoneyTransactionRepository.pull());
    };

    papaparse.parse(csv, {
      header  : true,
      complete: onComplete
    } as ParseConfig);
  });
}

@Injectable()
export class ImportDataAction extends Action<AppState> {

  constructor(private ImportFacade: ImportFacade,
              private MoneyTransactionRepository: MoneyTransactionRepository) {
    super();
  }

  create(csv: string): this {
    this.createReducer(async (st: AppState) => {
      st.json = await fn(
        this.ImportFacade,
        this.MoneyTransactionRepository,
        csv
      );
      return Promise.resolve(st);
    });
    return this;
  }

}
