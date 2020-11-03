import { IMoney, Money } from './Money';

export interface IOriginalBatch {
  id: number;
  amount: IMoney;
  expiresAt: string;
  expiresAtExtent: string;
}

export class OriginalBatch {
  public id: number;
  public amount: Money;
  public expiresAt: string;
  public expiresAtExtent: string;

  constructor(json: IOriginalBatch) {
    this.id = json.id;
    this.amount = new Money(json.amount);
    this.expiresAt = json.expiresAt;
    this.expiresAtExtent = json.expiresAtExtent;
  }
}

export interface IBatch {
  id: number;
  balance: IMoney;
  expiresAt: string;
  expiresAtExtent: string;
  batch: IOriginalBatch;
}

export class Batch {
  public id: number;
  public balance: Money;
  public expiresAt: string;
  public expiresAtExtent: string;
  public batch: OriginalBatch;

  constructor(json: IBatch) {
    this.id = json.id;
    this.balance = new Money(json.balance);
    this.expiresAt = json.expiresAt;
    this.expiresAtExtent = json.expiresAtExtent;
    this.batch = new OriginalBatch(json.batch);
  }
}
