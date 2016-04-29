import {AbstractMoneyTransaction} from './abstract-money-transaction';
import {Relation} from '../../../app-database';

export class PrePersistMoneyTransaction extends AbstractMoneyTransaction {

  constructor(item: any, relationIdMap: Relation<Map<string, number>>) {
    super();

    this.type           = item['Type'];
    this.date           = item['Date'];
    this.currencyCode   = item['CurrencyCode'];
    this.amount         = item['Amount'];
    this.currencyCodeTo = item['CurrencyCodeTo'];
    this.amountTo       = item['AmountTo'];
    this.note           = item['Note'];

    this.accountId     = relationIdMap.accounts     .get(item['Account']);
    this.accountToId   = relationIdMap.accounts     .get(item['AccountTo']);
    this.categoryId    = relationIdMap.categories   .get(item['Category']);
    this.subcategoryId = relationIdMap.subcategories.get(item['Subcategory']);
    this.payeePayerId  = relationIdMap.payeePayers  .get(item['Payee/Payer']);
    this.tagId         = relationIdMap.tags         .get(item['Tag']);
  }
  
}