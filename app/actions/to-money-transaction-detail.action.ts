import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Action} from '../walts-proto';

import {AppState} from '../app.store';
import {MoneyTransactionRepository} from '../domain/application/money-transaction/money-transaction-repository.service';
import {MoneyTransactionDetailComponent} from '../money-transaction-detail.component';
import {MoneyTransactionId} from '../domain/core/money-transaction/money-transaction-id';

@Injectable()
export class ToMoneyTransactionDetailAction extends Action<AppState> {

  constructor(private Router: Router,
              private MoneyTransactionRepository: MoneyTransactionRepository) {
    super();
  }

  create(id: MoneyTransactionId): this {
    this.createReducer(async (st: AppState) => {
      st.routeState       = MoneyTransactionDetailComponent.routeName;
      st.moneyTransaction = await this.MoneyTransactionRepository.pull(id);
      return new Promise(async (resolve) => {
        await this.Router.navigate([st.routeState, {id: id.value}]);
        resolve(st);
      });
    });
    return this;
  }

}
