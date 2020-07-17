import { Gauge } from './gauge';

export class Socket {
  public id: number;
  public name: string;
  public created: string;
  public updated: string;

  public gauges: Gauge[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.created = data.created;
    this.updated = data.updated;
  }

}
