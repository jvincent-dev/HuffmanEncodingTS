export default class HuffNode {
  val: string;
  freq: number;
  next: null | HuffNode;
  left: null | HuffNode;
  right: null | HuffNode;

  constructor(freq: number, val: string) {
    this.val = val;
    this.freq = freq;
    this.next = null;
    this.left = null;
    this.right = null;
  }

  isLeaf() {
    return this.left === this.right && this.left === null;
  }

  print(): void {
    console.log(this);
  }
}
