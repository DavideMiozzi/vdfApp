export class Scene {
  text: string;
  number: number;
  style: any;
  option_a_dest: number;
  option_b_dest: number;
  originNumber: number;
  destNumber: number;

  constructor(text, number, style, option_a_dest, option_b_dest, originNumber, destNumber) {
    this.text = text;
    this.number = number;
    this.style = style;
    this.option_a_dest = option_a_dest;
    this.option_b_dest = option_b_dest;
    this.originNumber = originNumber;
    this.destNumber = destNumber;
}