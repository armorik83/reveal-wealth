import {AbstractEntity} from '../abstract/abstract-entity';

export class AbstractMoneyTransaction extends AbstractEntity {

  type:           string;
  date:           string;
  currencyCode:   string;
  amount:         number;
  currencyCodeTo: string;
  amountTo:       number;
  note:           string;

  accountId:     number;
  accountToId:   number;
  categoryId:    number;
  subcategoryId: number;
  payeePayerId:  number;
  tagId:         number;

  constructor() {
    super();
  }
  
}