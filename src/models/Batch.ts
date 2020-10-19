import { Currency, Money } from './Money';

export interface IBatch {
  id: number;
  balance: number;
  currency: Currency;
  expiresAt: string;
}

export class Batch {
  public id: number;
  public balance: number;
  public currency: Currency;
  public expiresAt: string;

  constructor(json: IBatch) {
    this.id = json.id;
    this.balance = json.balance;
    this.currency = json.currency;
    this.expiresAt = json.expiresAt;
  }

  get money() {
    return new Money(this.balance, this.currency).toString();
  }
}
