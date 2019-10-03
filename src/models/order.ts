import { User } from "./user";
import { Tale } from "./tale";
import { Child } from "./child";

export class Print {
  child_id: number;
  tale_id: number;
  inscription: string;
  child: Child;
  tale: Tale;

  constructor(child_id, tale_id, inscription) {
    this.child_id = child_id;
    this.tale_id = tale_id;
    this.inscription = inscription;
  }
}

export class Order {
  id: number;
  prints: Print[];
  products: Object[];
  user: User;

  constructor() {
    this.prints = [];
  }
}