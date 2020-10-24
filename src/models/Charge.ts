import { Currency, Money } from './Money';

export interface ICashier {
  firstName: string;
  lastName: string;
}

export interface ICharge {
  id: number;
  amount: number;
  currency: Currency;
  displayName: string;
  cashier: ICashier;
}

export class Movement {
  public id: number;
  public amount: number;
  public currency: Currency;
  public displayName: string;
  public cashier: ICashier;

  constructor(json: ICharge) {
    this.id = json.id;
    this.amount = json.amount;
    this.currency = json.currency;
    this.displayName = json.displayName;
    this.cashier = json.cashier;
  }

  get money() {
    return new Money(this.amount, this.currency).toString();
  }
}
