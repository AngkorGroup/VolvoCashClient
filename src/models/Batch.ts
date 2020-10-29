import { Currency } from './Money';

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
    // FIXME: this was changed due  to change in structure
    return 'hola';
    // return new Money(this.balance, this.currency).toString();
  }
}
