import {Injectable} from 'angular2/core';
import {Action} from '../walts-proto';

import {AppState} from '../app.store';
import {MoneyTransactionRepository} from '../domain/application/money-transaction/money-transaction-repository.service';

@Injectable()
export class InitMoneyTransactionDetailAction extends Action<AppState> {

  constructor(private MoneyTransactionRepository: MoneyTransactionRepository) {
    super()
  }

  create(): this {
    this.createReducer(async(curr: AppState, next: AppState) => {
      const entity          = curr.moneyTransaction;
      next.moneyTransaction = await this.MoneyTransactionRepository.pull(entity.id);
      return Promise.resolve(next);
    });
    return this;
  }

}
