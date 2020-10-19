export type Currency = 'PEN';

const CURRENCY_SYMBOL_MAP = {
  PEN: 'S/',
};

export class Money {
  constructor(public balance: number, public currency: Currency) {}

  toString() {
    return `${CURRENCY_SYMBOL_MAP[this.currency]} ${this.balance.toFixed(2)}`;
  }
}
