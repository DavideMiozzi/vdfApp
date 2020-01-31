import { User } from "./user";
import { Tale } from "./tale";
import { Child } from "./child";

export class Print {
  child_id: number;
  tale_id: number;
  inscription: string;
  child: Child;
  tale: Tale;

  constructor(child_id = null, tale_id = null, inscription = null) {
    this.child_id = child_id;
    this.tale_id = tale_id;
    this.inscription = inscription;
  }

  public customize() {
    this.tale = Object.assign(new Tale(), this.tale);
    this.tale.customizeTitle(this.child);
  }
}

export class Product {
  print: Print;

  constructor() {
  }

  public customize() {
    this.print = Object.assign(new Print(), this.print);
    this.print.customize();
  }
}

export class Order {
  id: number;
  status: string;
  updated_at: string;
  prints: Print[];
  products: Product[];
  user: User;

  constructor() {
    this.prints = [];
    this.products = [];
  }

  public customize() {
    this.products.forEach((product) => {
      product.customize();
    });
    this.prints.forEach((print) => {
      print.customize();
    });
  }
}