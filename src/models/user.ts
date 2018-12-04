import { Address } from "./address";
import { Child } from "./child";
import { Order } from "./order";
import { Tale } from "./tale";

export class User {
  id: number;
  name: string;
  email: string
  language: string;
  admin: boolean;
  billing_address?: Address;
  delivery_address?: Address;
  children?: Child[];
  orders?: Order[];
  tales?: Tale[];
}
