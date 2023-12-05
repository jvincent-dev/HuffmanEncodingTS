"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HuffNode {
    constructor(freq, val) {
        this.val = val;
        this.freq = freq;
        this.next = null;
        this.left = null;
        this.right = null;
    }
    isLeaf() {
        return this.left === this.right && this.left === null;
    }
    print() {
        console.log(this);
    }
}
exports.default = HuffNode;
