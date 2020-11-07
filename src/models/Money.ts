export type Currency = 'PEN' | 'USD';

export const CURRENCY_SYMBOL_MAP = {
  PEN: 'S/',
  USD: '$',
};

export interface IMoney {
  value: number;
  currency: Currency;
}

export class Money {
  public value: number;
  public currency: Currency;

  constructor(json: IMoney) {
    this.value = json.value;
    this.currency = json.currency;
  }

  toString() {
    return `${CURRENCY_SYMBOL_MAP[this.currency]} ${this.value.toFixed(2)}`;
  }
}
