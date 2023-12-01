import HuffList from "./HuffList";
import HuffNode from "./HuffNode";
import HuffTree from "./HuffTree";

type InitType = "map" | "text";

export default class HuffCode {
  codeTree: null | HuffTree;
  codeMap: number[];

  constructor() {
    this.codeMap = new Array(256).fill(0);
    this.codeTree = null;
  }

  /** initializes this.codeTree and this.codeMap from original text or freq map */

  init(input: string = "", type: InitType = "text") {
    if (input === "") {
      throw Error("Input string is empty.");
    }

    const ll = new HuffList();

    if (type === "map") {
      const charCountPairs: string[] = input.split("::");

      charCountPairs.forEach((pair) => {
        this.codeMap[pair.charCodeAt(0)] = parseInt(pair.substring(1));
      });
    } else {
      for (let i = 0; i < input.length; i++) {
        const char = input[i];

        this.codeMap[char.charCodeAt(0)]++;
      }
    }

    this.codeMap.forEach((freq, charCode) => {
      if (freq > 0) {
        ll.insert(new HuffNode(freq, String.fromCharCode(charCode)));
      }
    });

    if (!ll.head?.next) {
      const newNode = new HuffNode(0, "");

      newNode.left = ll.head;

      this.codeTree = new HuffTree(newNode);
    } else {
      while (ll.head?.next) {
        const newNode = new HuffNode(0, "");
  
        newNode.left = ll.removeHead();
  
        if (ll.head !== null) {
          newNode.right = ll.removeHead();
        }
  
        newNode.freq = newNode.left.freq + (newNode.right?.freq || 0);
  
        ll.insert(newNode);
      }
  
      this.codeTree = new HuffTree(ll.head);
    }
  }

  #encodeHelper(char: string, node: null | HuffNode = null, code: string = ""): string {
    if (!node) {
      return "";
    } else if (node.val === char) {
      return code;
    }

    const code1 = this.#encodeHelper(char, node.left, code + "0");
    const code2 = this.#encodeHelper(char, node.right, code + "1");

    if (code1 === "") {
      return code2;
    }

    return code1;
  } // # makes it private

  #decodeHelper(bits: string, node: null | HuffNode = null, index: number = 0, resultArr: string[] = []): string {
    if (!node || !this.codeTree?.root) {
      throw new Error("Invalid decoder tree.");
    } else if (node.isLeaf()) {
      resultArr.push(node.val);

      if (index < bits.length) {
        return this.#decodeHelper(bits, this.codeTree.root, index, resultArr);
      }

      return resultArr.join("");
    } else if (bits[index] === "0") {
      return this.#decodeHelper(bits, node.left, index + 1, resultArr);
    } else if (bits[index] === "1") {
      return this.#decodeHelper(bits, node.right, index + 1, resultArr);
    }

    throw new Error("Invalid encoded bits.");
  }

  #createMapHelper(mapPair: string[], currNode: HuffNode) {
    if (currNode.isLeaf()) {
      return mapPair.push(`${currNode.val}${currNode.freq}`);
    }

    if (currNode.left) {
      this.#createMapHelper(mapPair, currNode.left);
    }

    if (currNode.right) {
      this.#createMapHelper(mapPair, currNode.right);
    }
  }

  createMap() {
    const result: string[] = [];

    if (!this.codeTree?.root) {
      throw Error("HuffCode is uninitialized");
    }

    this.#createMapHelper(result, this.codeTree.root);

    return result.join("::");
  }

  encode(text: string) {
    if (this.codeTree === null) {
      throw Error("HuffCode is uninitialized.");
    }

    const encodingArr = [];

    for (let i = 0; i < text.length; i++) {
      const currChar = text[i];
      const charBitCode = this.#encodeHelper(currChar, this.codeTree.root);

      if (charBitCode === "") {
        throw new Error(`Invalid HuffTree: '${text[i]}' doesn't exist.`);
      }

      encodingArr.push(charBitCode);
    }

    return encodingArr.join("");
  }

  decode(bits: string) {
    if (this.codeTree === null) {
      throw Error("HuffCode is uninitialized.");
    }

    return this.#decodeHelper(bits, this.codeTree?.root);
  }
}
