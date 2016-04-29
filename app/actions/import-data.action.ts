import {Injectable} from 'angular2/core';
import * as papaparse from 'papaparse';
import {Action} from '../walts-proto';

import {AppState} from '../app.store';
import {ImportFacade} from '../import-facade.service';
import {BindableMoneyTransaction} from '../domain/application/money-transaction/bindable-money-transaction';

type ParseResult = PapaParse.ParseResult;
type ParseConfig = PapaParse.ParseConfig;

export function fn(ImportFacade: ImportFacade,
                   csv: string): Promise<any[]> {
  return new Promise<BindableMoneyTransaction[]>((resolve) => {
    const onComplete = async (results: ParseResult) => {
      const repository = await ImportFacade.importToDb(results.data);
      resolve(await repository.pull());
    };

    papaparse.parse(csv, {
      header  : true,
      complete: onComplete
    } as ParseConfig);
  });
}

@Injectable()
export class ImportDataAction extends Action<AppState> {

  constructor(private ImportFacade: ImportFacade) {
    super();
  }

  create(csv: string): this {
    this.createReducer(async (st: AppState) => {
      st.moneyTransactions = await fn(this.ImportFacade, csv);
      return Promise.resolve(st);
    });
    return this;
  }

}
