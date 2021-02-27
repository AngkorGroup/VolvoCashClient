import { Card, ICard } from './Card';
import { IMoney, Money } from './Money';

export interface ITransfer {
  id: number;
  operationCode: string;
  amount: IMoney;
  displayName: string;
  imageUrl: string;
  originCardId: number;
  originCard: ICard;
  destinyCardId: number;
  destinyCard: ICard;
  createdAt: string;
}

export class Transfer {
  public id: number;
  public operationCode: string;
  public amount: IMoney;
  public displayName: string;
  public imageUrl: string;
  public originCardId: number;
  public originCard?: ICard;
  public destinyCardId: number;
  public destinyCard?: ICard;
  public createdAt: string;

  constructor(json: ITransfer) {
    this.id = json.id;
    this.operationCode = json.operationCode;
    this.amount = new Money(json.amount);
    this.displayName = json.displayName;
    this.imageUrl = json.imageUrl;
    this.originCardId = json.originCardId;
    this.originCard = json.originCard ? new Card(json.originCard) : undefined;
    this.destinyCardId = json.destinyCardId;
    this.destinyCard = json.destinyCard
      ? new Card(json.destinyCard)
      : undefined;
    this.createdAt = json.createdAt;
  }
}
