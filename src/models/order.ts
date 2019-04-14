export class Print {
  child_id: number;
  tale_id: number;
  inscription: string;

  constructor(child_id, tale_id, inscription) {
    this.child_id = child_id;
    this.tale_id = tale_id;
    this.inscription = inscription;
  }
}

export class Order {
  id: number;
  prints: Print[];

  constructor() {
    this.prints = [];
  }
}