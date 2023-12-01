import HuffNode from "./HuffNode";

export default class HuffTree {
  root: null | HuffNode;

  constructor(root: null | HuffNode = null) {
    this.root = root;
  }

  preorder(node: null | HuffNode = this.root) {
    if (!node) {
      return;
    }

    console.log(node.val, `(${node.freq})`);
    this.preorder(node.left);
    this.preorder(node.right);
  }

  inorder(node: null | HuffNode = this.root) {
    if (!node) {
      return;
    }

    this.preorder(node.left);
    console.log(node.val, `(${node.freq})`);
    this.preorder(node.right);
  }

  postorder(node: null | HuffNode = this.root) {
    if (!node) {
      return;
    }

    this.preorder(node.left);
    this.preorder(node.right);
    console.log(node.val, `(${node.freq})`);
  }
}