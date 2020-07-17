import { Socket } from './socket';

export class Client {

  public id: number;
  public name: string;
  public email: string;
  public created: Date;
  public updated: Date;

  public sockets: Socket[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.created = data.created;
    this.updated = data.updated;
  }

  public setSockets(sockets: Socket[]): void {
    this.sockets = sockets;
  }

}
