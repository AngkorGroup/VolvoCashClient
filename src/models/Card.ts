import { Currency, Money } from './Money';

export interface CardType {
  id: number;
  name: string;
  displayName: string;
  color: string;
}

type OwnerType = 'primary' | 'secondary';

export interface ICard {
  id: number;
  cardType: CardType;
  balance: number;
  currency: Currency;
  imageUrl?: string;
  ownerName?: string;
  qrUrl?: string;
  ownerType: OwnerType;
}

export class Card {
  public id: number;
  public cardType: CardType;
  public balance: number;
  public currency: Currency;
  public imageUrl?: string;
  public ownerName?: string;
  public qrUrl?: string;
  public ownerType: OwnerType;

  constructor(json: ICard) {
    this.id = json.id;
    this.cardType = json.cardType;
    this.balance = json.balance;
    this.imageUrl = json.imageUrl;
    this.ownerName = json.ownerName;
    this.qrUrl = json.qrUrl;
    this.currency = json.currency;
    this.ownerType = json.ownerType;
  }

  get color() {
    return this.cardType.color;
  }

  get money() {
    return new Money(this.balance, this.currency).toString();
  }
}
