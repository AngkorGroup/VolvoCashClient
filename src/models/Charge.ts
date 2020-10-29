import { Currency, Money } from './Money';
import { Cashier, ICashier } from './Cashier';

export interface ICharge {
  id: number;
  amount: number;
  currency: Currency;
  displayName: string;
  cashier: ICashier;
}

export class Charge {
  public id: number;
  public amount: number;
  public currency: Currency;
  public displayName: string;
  public cashier: Cashier;

  constructor(json: ICharge) {
    this.id = json.id;
    this.amount = json.amount;
    this.currency = json.currency;
    this.displayName = json.displayName;
    this.cashier = new Cashier(json.cashier);
  }

  get money() {
    // FIXME: this was changed due  to change in structure
    return 'hola';
    // return new Money(this.amount, this.currency).toString();
  }
}
