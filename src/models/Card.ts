import { Batch } from './Batch';
import { Contact } from './Contact';
import { Currency, IMoney, Money } from './Money';
import { Movement } from './Movement';

export interface ICardType {
  id: number;
  name: string;
  displayName: string;
  color: string;
  currency: Currency;
}

export interface ICard {
  id: number;
  code: string;
  balance: IMoney;
  calculatedBalance: IMoney;
  qrUrl?: string;
  cardType: ICardType;
  movements?: Movement[];
  batches?: Batch[];
  contact: Contact;
  contactId: number;
}

export class Card {
  public id: number;
  public code: string;
  public balance: Money;
  public calculatedBalance: Money;
  public qrUrl?: string;
  public cardType: ICardType;
  public movements?: Movement[];
  public batches?: Batch[];
  public contact: Contact;
  public contactId: number;

  constructor(json: ICard) {
    this.id = json.id;
    this.code = json.code;
    this.cardType = json.cardType;
    this.balance = new Money(json.balance);
    this.calculatedBalance = new Money(json.calculatedBalance);
    this.qrUrl = json.qrUrl;
    this.movements = json.movements;
    this.batches = json.batches;
    this.contact = new Contact(json.contact);
    this.contactId = json.contactId;
  }

  get color() {
    return this.cardType.color;
  }
}
