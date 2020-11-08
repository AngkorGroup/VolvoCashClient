export type Currency = 'PEN' | 'USD';

export const CURRENCY_SYMBOL_MAP = {
  PEN: 'S/',
  USD: '$',
};

export interface IMoney {
  value: number;
  currency: Currency;
  currencyLabel: string;
  label: string;
}

export class Money {
  public value: number;
  public currency: Currency;
  public currencyLabel: string;
  public label: string;

  constructor(json: IMoney) {
    this.value = json.value;
    this.currency = json.currency;
    this.currencyLabel = json.currencyLabel;
    this.label = json.label;
  }

  toString() {
    return `${CURRENCY_SYMBOL_MAP[this.currency]} ${this.value.toFixed(2)}`;
  }
}
