import { Currency, IMoney, Money } from './Money';
import { ICharge, Charge } from './Charge';
import { ITransfer, Transfer } from './Transfer';

export type Status = 'Pending' | 'Accepted' | 'Rejected' | 'Canceled';
type MovementType = 'in' | 'out';

export interface IMovement {
  id: number;
  displayName: string;
  description: string;
  amount: IMoney;
  currency: Currency;
  type: MovementType;
  charge: ICharge;
  transfer: ITransfer;
  createdAt: string;
}

export class Movement {
  public id: number;
  public displayName: string;
  public description: string;
  public amount: Money;
  public type: MovementType;
  public charge?: Charge;
  public transfer?: Transfer;
  public createdAt: string;
  public currency: Currency;

  constructor(json: IMovement) {
    this.id = json.id;
    this.displayName = json.displayName;
    this.description = json.description;
    this.amount = new Money(json.amount);
    this.type = json.type;
    this.charge = json.charge ? new Charge(json.charge) : undefined;
    this.transfer = json.transfer ? new Transfer(json.transfer) : undefined;
    this.createdAt = json.createdAt;
    this.currency = json.currency;
  }
}
