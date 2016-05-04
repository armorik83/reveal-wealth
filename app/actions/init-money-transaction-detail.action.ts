import {Injectable} from '@angular/core';
import {Action} from '../walts-proto';

import {AppState} from '../app.store';
import {MoneyTransactionRepository} from '../domain/application/money-transaction/money-transaction-repository.service';

@Injectable()
export class InitMoneyTransactionDetailAction extends Action<AppState> {

  constructor(private MoneyTransactionRepository: MoneyTransactionRepository) {
    super();
  }

  create(): this {
    this.createReducer(async(curr: AppState) => {
      let next              = {} as AppState;
      const entity          = curr.moneyTransaction;
      next.moneyTransaction = await this.MoneyTransactionRepository.pull(entity.id);
      return Promise.resolve(this.merge(curr, next));
    });
    return this;
  }

}
