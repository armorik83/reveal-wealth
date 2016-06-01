import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Action, Reducer} from 'walts';

import {routePaths} from '../app-router-definition';
import {AppState} from '../app.store';
import {MoneyTransactionRepository} from '../domain/application/money-transaction/money-transaction-repository.service';
import {BindableMoneyTransaction} from '../domain/application/money-transaction/bindable-money-transaction';

@Injectable()
export class ToMoneyTransactionDetailAction extends Action<AppState> {

  constructor(private Router: Router,
              private MoneyTransactionRepository: MoneyTransactionRepository) {
    super();
  }

  create(entity: BindableMoneyTransaction): Reducer<AppState> {
    return async (curr: AppState) => {
      let next = {} as AppState;
      next.routeState       = routePaths.MoneyTransactionDetailComponent;
      next.moneyTransaction = await this.MoneyTransactionRepository.pull(entity.id);
      await this.Router.navigate([next.routeState, {id: entity.id.value}]);

      return Promise.resolve(this.merge(curr, next));
    };
  }

}
