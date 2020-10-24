import { Currency, Money } from './Money';

export interface ICharge {
  id: number;
  amount: number;
  currency: Currency;
  displayName: string;
  cashierName: string;
}

export class Movement {
  public id: number;
  public amount: number;
  public currency: Currency;
  public displayName: string;
  public cashierName: string;

  constructor(json: ICharge) {
    this.id = json.id;
    this.amount = json.amount;
    this.currency = json.currency;
    this.displayName = json.displayName;
    this.cashierName = json.cashierName;
  }

  get money() {
    return new Money(this.amount, this.currency).toString();
  }
}
