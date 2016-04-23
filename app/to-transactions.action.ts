import {Router} from 'angular2/router';

import {Action} from './flux/action';
import {AppState} from './app.store';
import {TransactionsComponent} from './transactions.component';

export class ToTransactionsAction extends Action<AppState> {
  
  constructor(Router: Router) {
    super((st: AppState) => {
      st.routeState = TransactionsComponent.routeName;
      return new Promise((resolve) => {
        Router.navigate([st.routeState]).then(() => {
          resolve(st);
        });
      });
    });
  }

}