import { IClient } from './Client';

export interface IContact {
  id: number;
  firstName: string;
  lastName: string;
  type: ContactType;
  phone?: string;
  email?: string;
  documentTypeId?: number;
  documentNumber?: string;
  status?: string;
  clientId?: number;
  client?: IClient;
  contactParentId?: number;
}

export type ContactType = 'Primary' | 'Secondary';

export class Contact {
  public id: number;
  public firstName: string;
  public lastName: string;
  public type: ContactType;
  public phone?: string;
  public email?: string;
  public documentTypeId?: number;
  public documentNumber?: string;
  public status?: string;
  public clientId?: number;
  public client?: IClient;
  public contactParentId?: number;

  constructor(json: IContact) {
    this.id = json.id;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.type = json.type;
    this.phone = json.phone;
    this.email = json.email;
    this.documentTypeId = json.documentTypeId;
    this.documentNumber = json.documentNumber;
    this.status = json.status;
    this.clientId = json.clientId;
    this.client = json.client;
    this.contactParentId = json.contactParentId;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
