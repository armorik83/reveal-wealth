import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Action} from '../walts-proto';

import {routeNames} from '../app-router-definition';
import {AppState} from '../app.store';
import {MoneyTransactionRepository} from '../domain/application/money-transaction/money-transaction-repository.service';
import {BindableMoneyTransaction} from '../domain/application/money-transaction/bindable-money-transaction';

@Injectable()
export class ToMoneyTransactionDetailAction extends Action<AppState> {

  constructor(private Router: Router,
              private MoneyTransactionRepository: MoneyTransactionRepository) {
    super();
  }

  create(entity: BindableMoneyTransaction): this {
    this.createReducer(async (curr: AppState, next: AppState) => {
      next.routeState       = routeNames.MoneyTransactionDetailComponent;
      next.moneyTransaction = await this.MoneyTransactionRepository.pull(entity.id);
      return new Promise(async (resolve) => {
        await this.Router.navigate([next.routeState, {id: entity.id.value}]);
        resolve(next);
      });
    });
    return this;
  }

}
