export interface ICashier {
  firstName: string;
  lastName: string;
}

export class Cashier {
  public firstName: string;
  public lastName: string;

  constructor(json: ICashier) {
    this.firstName = json.firstName;
    this.lastName = json.lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
