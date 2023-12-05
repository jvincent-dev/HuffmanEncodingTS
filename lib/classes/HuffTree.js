"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HuffTree {
    constructor(root = null) {
        this.root = root;
    }
    preorder(node = this.root) {
        if (!node) {
            return;
        }
        console.log(node.val, `(${node.freq})`);
        this.preorder(node.left);
        this.preorder(node.right);
    }
    inorder(node = this.root) {
        if (!node) {
            return;
        }
        this.preorder(node.left);
        console.log(node.val, `(${node.freq})`);
        this.preorder(node.right);
    }
    postorder(node = this.root) {
        if (!node) {
            return;
        }
        this.preorder(node.left);
        this.preorder(node.right);
        console.log(node.val, `(${node.freq})`);
    }
}
exports.default = HuffTree;
