export type Currency = 'PEN' | 'USD';

export const CURRENCY_SYMBOL_MAP = {
  PEN: 'S/',
  USD: '$',
};

export interface IMoney {
  value: number;
  currencyCode: Currency;
  currencyLabel: string;
  label: string;
}

export class Money {
  public value: number;
  public currencyCode: Currency;
  public currencyLabel: string;
  public label: string;

  constructor(json: IMoney) {
    this.value = json.value;
    this.currencyCode = json.currencyCode;
    this.currencyLabel = json.currencyLabel;
    this.label = json.label;
  }

  toString() {
    return `${CURRENCY_SYMBOL_MAP[this.currencyCode]} ${this.value.toFixed(2)}`;
  }
}
