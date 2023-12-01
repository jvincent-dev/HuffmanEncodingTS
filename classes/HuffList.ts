import HuffNode from "./HuffNode";

export default class HuffList {
  head: null | HuffNode;

  constructor() {
    this.head = null;
  }

  insert(newNode: HuffNode): HuffNode {
    if (this.head === null || newNode.freq < this.head.freq) {
      const temp = this.head;

      this.head = newNode;
      this.head.next = temp;
    } else {
      let runner = this.head;

      while (runner.next && newNode.freq > runner.next.freq) {
        runner = runner.next;
      }

      const temp = runner.next;

      runner.next = newNode;
      newNode.next = temp;
    }

    return newNode;
  }

  removeHead(): HuffNode {
    if (this.head === null) {
      throw Error("List is empty");
    }

    const temp = this.head;

    this.head = this.head.next || null;

    return temp;
  }

  print(): void {
    const values: string[] = [];
    let runner: null | HuffNode = this.head;

    while (runner !== null) {
      values.push(`${runner.val} (${runner.freq})`);
      runner = runner.next;
    }

    if (values.length === 0) {
      console.log("Empty");
    } else {
      console.log(values.join(" -> "), "->", runner);
    }
  }
}
