export type RouteState =
  '/money-transactions' |
  '/money-transaction-detail/:id' |
  '/import' |
  'n/a'

export const routePaths = {
  MoneyTransactionsComponent     : '/money-transactions' as '/money-transactions',
  MoneyTransactionDetailComponent: '/money-transaction-detail/:id' as '/money-transaction-detail/:id',
  ImportDataComponent            : '/import' as '/import'
};
