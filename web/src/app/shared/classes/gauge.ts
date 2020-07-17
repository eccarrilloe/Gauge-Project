export class Gauge {

    public id: number;
    public name: string;
    public created: string;
    public updated: string;

    constructor(data: any) {
      this.id = data.id;
      this.name = data.name;
      this.created = data.created;
      this.updated = data.updated;
    }
}
