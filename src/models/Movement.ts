import { Currency, Money } from './Money';

type MovementType = 'in' | 'out';

export interface IMovement {
  id: number;
  displayName: string;
  description: string;
  amount: number;
  type: MovementType;
  date: string;
  currency: Currency;
}

export class Movement {
  public id: number;
  public displayName: string;
  public description: string;
  public amount: number;
  public type: MovementType;
  public date: string;
  public currency: Currency;

  constructor(json: IMovement) {
    this.id = json.id;
    this.displayName = json.displayName;
    this.description = json.description;
    this.amount = json.amount;
    this.type = json.type;
    this.date = json.date;
    this.currency = json.currency;
  }

  get money() {
    return new Money(this.amount, this.currency).toString();
  }
}
