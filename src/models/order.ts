export class Print {
  child_id: number;
  tale_id: number;
  inscription: string;
}

export class Order {
  id: number;
  prints: Print[];
}