import { Currency, IMoney, Money } from './Money';

type MovementType = 'in' | 'out';

export interface IMovement {
  id: number;
  displayName: string;
  description: string;
  amount: IMoney;
  currency: Currency;
  type: MovementType;
  date: string;
}

export class Movement {
  public id: number;
  public displayName: string;
  public description: string;
  public amount: Money;
  public type: MovementType;
  public date: string;
  public currency: Currency;

  constructor(json: IMovement) {
    this.id = json.id;
    this.displayName = json.displayName;
    this.description = json.description;
    this.amount = new Money(json.amount);
    this.type = json.type;
    this.date = json.date;
    this.currency = json.currency;
  }
}
