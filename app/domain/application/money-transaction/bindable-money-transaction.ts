import {AbstractMoneyTransaction} from '../../core/money-transaction/abstract-money-transaction';
import {Relation} from '../../../app-database';

export class BindableMoneyTransaction extends AbstractMoneyTransaction {

  constructor(item: any, relationValueMap: Relation<Map<number, string>>) {
    super();
    this.type           = item.type;
    this.date           = item.date;
    this.currencyCode   = item.currencyCode;
    this.amount         = item.amount;
    this.currencyCodeTo = item.currencyCodeTo;
    this.amountTo       = item.amountTo;
    this.note           = item.note;

    this.accountId     = item.accountId;
    this.categoryId    = item.categoryId;
    this.subcategoryId = item.subcategoryId;
    this.payeePayerId  = item.payeePayerId;
    this.tagId         = item.tagId;

    this.account     = relationValueMap.accounts     .get(item.accountId);
    this.category    = relationValueMap.categories   .get(item.categoryId);
    this.subcategory = relationValueMap.subcategories.get(item.subcategoryId);
    this.payeePayer  = relationValueMap.payeePayers  .get(item.payeePayerId);
    this.tag         = relationValueMap.tags         .get(item.tagId);
  }

}