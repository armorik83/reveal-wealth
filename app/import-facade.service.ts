import {Injectable} from 'angular2/core';

import {AppDatabaseProvider} from './app-database-provider.service';
import {AppDatabase} from './app-database';

@Injectable()
export class ImportFacade {

  private db: AppDatabase;
  
  constructor(AppDatabaseProvider: AppDatabaseProvider) {
    const AppDatabase = AppDatabaseProvider.getConstructor();
    this.db           = new AppDatabase();
  }

  async normalize(importedResult: any[]): Promise<any> {
    this.db.initialize();

    const dbTransactionScope = () => {
      importedResult.forEach(async (item: any) => {
        const draft = {} as any;

        const tables = [
          this.db.accounts,
          this.db.categories,
          this.db.subcategories,
          this.db.payeePayers,
          this.db.tags
        ];

        if (item['Account']) {
          const table   = this.db.accounts;
          const account = item['Account'];
          const res     = await table.where('account').equalsIgnoreCase(account);
          const count   = await res.count();
          console.log(account, count);

          console.assert(count <= 1, 'Account has been double registration');
          if (count < 1) {
            draft.accountId = await table.add({account});
          } else if (count === 1) {
            draft.accountId = (await res.first()).id;
          }
        }

        if (item['AccountTo']) {
          const table   = this.db.accounts;
          const account = item['AccountTo'];
          const res     = await table.where('account').equalsIgnoreCase(account);
          const count   = await res.count();

          console.assert(count <= 1, 'Account has been double registration');
          if (count < 1) {
            draft.accountToId = await table.add({account});
          } else if (count === 1) {
            draft.accountToId = (await res.first()).id;
          }
        }

        if (item['Category']) {
          const table    = this.db.categories;
          const category = item['Category'];
          const res      = await table.where('category').equalsIgnoreCase(category);
          const count    = await res.count();

          console.assert(count <= 1, 'Category has been double registration');
          if (count < 1) {
            draft.categoryId = await table.add({category});
          } else if (count === 1) {
            draft.categoryId = (await res.first()).id;
          }
        }

        if (item['Subcategory']) {
          const table       = this.db.subcategories;
          const subcategory = item['Subcategory'];
          const res         = await table.where('subcategory').equalsIgnoreCase(subcategory);
          const count       = await res.count();

          console.assert(count <= 1, 'Subcategory has been double registration');
          if (count < 1) {
            draft.subcategoryId = await table.add({subcategory});
          } else if (count === 1) {
            draft.subcategoryId = (await res.first()).id;
          }
        }

        if (item['Payee/Payer']) {
          const table      = this.db.payeePayers;
          const payeePayer = item['Payee/Payer'];
          const res        = await table.where('payeePayer').equalsIgnoreCase(payeePayer);
          const count      = await res.count();

          console.assert(count <= 1, 'PayeePayer has been double registration');
          if (count < 1) {
            draft.payeePayerId = await table.add({payeePayer});
          } else if (count === 1) {
            draft.payeePayerId = (await res.first()).id;
          }
        }

        if (item['Tag']) {
          const table = this.db.tags;
          const tag   = item['Tag'];
          const res   = await table.where('tag').equalsIgnoreCase(tag);
          const count = await res.count();

          console.assert(count <= 1, 'Tag has been double registration');
          if (count < 1) {
            draft.tagId = await table.add({tag});
          } else if (count === 1) {
            draft.tagId = (await res.first()).id;
          }
        }

        this.db.moneyTransactions.add({
          'type'          : item['Type'],
          'date'          : item['Date'],
          'accountId'     : draft.accountId,
          'currencyCode'  : item['CurrencyCode'],
          'amount'        : item['Amount'],
          'accountToId'   : draft.accountToId,
          'currencyCodeTo': item['CurrencyCodeTo'],
          'amountTo'      : item['AmountTo'],
          'categoryId'    : draft.categoryId,
          'subcategoryId' : draft.subcategoryId,
          'payeePayerId'  : draft.payeePayerId,
          'tagId'         : draft.tagId,
          'note'          : item['Note']
        });
      });
    };

    return await this.db.transaction('rw', this.db.moneyTransactions, dbTransactionScope);
  }

}