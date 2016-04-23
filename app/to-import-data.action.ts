import {Router} from 'angular2/router';

import {Action} from './flux/action';
import {AppState} from './app.store';
import {ImportDataComponent} from './import-data.component';

export class ToImportDataAction extends Action<AppState> {
  
  constructor(Router: Router) {
    super((st: AppState) => {
      st.routeState = ImportDataComponent.routeName;
      return new Promise((resolve) => {
        Router.navigate([st.routeState]).then(() => {
          resolve(st);
        });
      });
    });
  }

}