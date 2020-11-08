import { IMoney, Money } from './Money';
import { Cashier, ICashier } from './Cashier';

type Status = 'Pending' | 'Accepted' | 'Rejected' | 'Canceled';
type Type = 'Remote' | 'FaceToFace';

export interface ICharge {
  id: number;
  amount: IMoney;
  displayName: string;
  description: string;
  operationCode: string;
  status: Status;
  chargeType: Type;
  cashier?: ICashier;
  imageUrl?: string;
  createdAt: string;
}

export class Charge {
  public id: number;
  public amount: Money;
  public displayName: string;
  public description: string;
  public operationCode: string;
  public status: Status;
  public chargeType: Type;
  public imageUrl: string;
  public cashier?: Cashier;
  public createdAt: string;

  constructor(json: ICharge) {
    this.id = json.id;
    this.amount = new Money(json.amount);
    this.status = json.status;
    this.displayName = json.displayName;
    this.description = json.description;
    this.operationCode = json.operationCode;
    this.createdAt = json.createdAt;
    this.imageUrl = json.imageUrl || '';
    this.chargeType = json.chargeType;
    this.cashier = json.cashier ? new Cashier(json.cashier) : undefined;
  }
}
