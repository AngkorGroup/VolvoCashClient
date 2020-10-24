export interface IContact {
  id: number;
  firstName: string;
  lastName: string;
  type: ContactType;
  phone: string;
  email: string;
  documentType: string;
  documentNumber: string;
  status: string;
  clientId: string;
  contactParentId: number;
}

export type ContactType = 'Primary' | 'Secondary';

export class Contact {
  public id: number;
  public firstName: string;
  public lastName: string;
  public type: ContactType;
  public phone: string;
  public email: string;
  public documentType: string;
  public documentNumber: string;
  public status: string;
  public clientId: string;
  public contactParentId: number;

  constructor(json: IContact) {
    this.id = json.id;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.type = json.type;
    this.phone = json.phone;
    this.email = json.email;
    this.documentType = json.documentType;
    this.documentNumber = json.documentNumber;
    this.status = json.status;
    this.clientId = json.clientId;
    this.contactParentId = json.contactParentId;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
