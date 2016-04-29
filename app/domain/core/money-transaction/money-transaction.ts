import {AbstractMoneyTransaction} from './abstract-money-transaction';

export class MoneyTransaction extends AbstractMoneyTransaction {

  static schema = [
    '++id',
    'type',
    'date',
    'currencyCode',
    'amount',
    'currencyCodeTo',
    'amountTo',
    'note',
    'accountId',
    'accountToId',
    'categoryId',
    'subcategoryId',
    'payeePayerId',
    'tagId'
  ].join(',');

  id: number;

  constructor() {
    super();
  }

}