import { IMoney, Money } from './Money';
import { Cashier, ICashier } from './Cashier';

type Status = 'Pending' | 'Accepted' | 'Rejected' | 'Canceled';
type Type = 'Remote' | 'FaceToFace';

export interface ICharge {
  id: number;
  amount: IMoney;
  displayName: string;
  status: Status;
  chargeType: Type;
  cashier: ICashier;
  createdAt: string;
}

export class Charge {
  public id: number;
  public amount: Money;
  public displayName: string;
  public status: Status;
  public chargeType: Type;
  public cashier: Cashier;
  public createdAt: string;

  constructor(json: ICharge) {
    this.id = json.id;
    this.amount = new Money(json.amount);
    this.status = json.status;
    this.displayName = json.displayName;
    this.createdAt = json.createdAt;
    this.chargeType = json.chargeType;
    this.cashier = new Cashier(json.cashier);
  }
}
