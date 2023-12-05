"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _HuffCode_instances, _HuffCode_encodeHelper, _HuffCode_decodeHelper, _HuffCode_createMapHelper;
Object.defineProperty(exports, "__esModule", { value: true });
const HuffList_1 = __importDefault(require("./HuffList"));
const HuffNode_1 = __importDefault(require("./HuffNode"));
const HuffTree_1 = __importDefault(require("./HuffTree"));
class HuffCode {
    constructor() {
        _HuffCode_instances.add(this);
        this.codeMap = new Array(256).fill(0);
        this.codeTree = null;
    }
    /** initializes this.codeTree and this.codeMap from original text or freq map */
    init(input = "", type = "text") {
        var _a, _b, _c;
        if (input === "") {
            throw Error("Input string is empty.");
        }
        const ll = new HuffList_1.default();
        if (type === "map") {
            const charCountPairs = input.split("::");
            charCountPairs.forEach((pair) => {
                this.codeMap[pair.charCodeAt(0)] = parseInt(pair.substring(1));
            });
        }
        else {
            for (let i = 0; i < input.length; i++) {
                const char = input[i];
                this.codeMap[char.charCodeAt(0)]++;
            }
        }
        this.codeMap.forEach((freq, charCode) => {
            if (freq > 0) {
                ll.insert(new HuffNode_1.default(freq, String.fromCharCode(charCode)));
            }
        });
        if (!((_a = ll.head) === null || _a === void 0 ? void 0 : _a.next)) {
            const newNode = new HuffNode_1.default(0, "");
            newNode.left = ll.head;
            this.codeTree = new HuffTree_1.default(newNode);
        }
        else {
            while ((_b = ll.head) === null || _b === void 0 ? void 0 : _b.next) {
                const newNode = new HuffNode_1.default(0, "");
                newNode.left = ll.removeHead();
                if (ll.head !== null) {
                    newNode.right = ll.removeHead();
                }
                newNode.freq = newNode.left.freq + (((_c = newNode.right) === null || _c === void 0 ? void 0 : _c.freq) || 0);
                ll.insert(newNode);
            }
            this.codeTree = new HuffTree_1.default(ll.head);
        }
    }
    createMap() {
        var _a;
        const result = [];
        if (!((_a = this.codeTree) === null || _a === void 0 ? void 0 : _a.root)) {
            throw Error("HuffCode is uninitialized");
        }
        __classPrivateFieldGet(this, _HuffCode_instances, "m", _HuffCode_createMapHelper).call(this, result, this.codeTree.root);
        return result.join("::");
    }
    encode(text) {
        if (this.codeTree === null) {
            throw Error("HuffCode is uninitialized.");
        }
        const encodingArr = [];
        for (let i = 0; i < text.length; i++) {
            const currChar = text[i];
            const charBitCode = __classPrivateFieldGet(this, _HuffCode_instances, "m", _HuffCode_encodeHelper).call(this, currChar, this.codeTree.root);
            if (charBitCode === "") {
                throw new Error(`Invalid HuffTree: '${text[i]}' doesn't exist.`);
            }
            encodingArr.push(charBitCode);
        }
        return encodingArr.join("");
    }
    decode(bits) {
        var _a;
        if (this.codeTree === null) {
            throw Error("HuffCode is uninitialized.");
        }
        return __classPrivateFieldGet(this, _HuffCode_instances, "m", _HuffCode_decodeHelper).call(this, bits, (_a = this.codeTree) === null || _a === void 0 ? void 0 : _a.root);
    }
}
_HuffCode_instances = new WeakSet(), _HuffCode_encodeHelper = function _HuffCode_encodeHelper(char, node = null, code = "") {
    if (!node) {
        return "";
    }
    else if (node.val === char) {
        return code;
    }
    const code1 = __classPrivateFieldGet(this, _HuffCode_instances, "m", _HuffCode_encodeHelper).call(this, char, node.left, code + "0");
    const code2 = __classPrivateFieldGet(this, _HuffCode_instances, "m", _HuffCode_encodeHelper).call(this, char, node.right, code + "1");
    if (code1 === "") {
        return code2;
    }
    return code1;
}, _HuffCode_decodeHelper = function _HuffCode_decodeHelper(bits, node = null, index = 0, resultArr = []) {
    var _a;
    if (!node || !((_a = this.codeTree) === null || _a === void 0 ? void 0 : _a.root)) {
        throw new Error("Invalid decoder tree.");
    }
    else if (node.isLeaf()) {
        resultArr.push(node.val);
        if (index < bits.length) {
            return __classPrivateFieldGet(this, _HuffCode_instances, "m", _HuffCode_decodeHelper).call(this, bits, this.codeTree.root, index, resultArr);
        }
        return resultArr.join("");
    }
    else if (bits[index] === "0") {
        return __classPrivateFieldGet(this, _HuffCode_instances, "m", _HuffCode_decodeHelper).call(this, bits, node.left, index + 1, resultArr);
    }
    else if (bits[index] === "1") {
        return __classPrivateFieldGet(this, _HuffCode_instances, "m", _HuffCode_decodeHelper).call(this, bits, node.right, index + 1, resultArr);
    }
    throw new Error("Invalid encoded bits.");
}, _HuffCode_createMapHelper = function _HuffCode_createMapHelper(mapPair, currNode) {
    if (currNode.isLeaf()) {
        return mapPair.push(`${currNode.val}${currNode.freq}`);
    }
    if (currNode.left) {
        __classPrivateFieldGet(this, _HuffCode_instances, "m", _HuffCode_createMapHelper).call(this, mapPair, currNode.left);
    }
    if (currNode.right) {
        __classPrivateFieldGet(this, _HuffCode_instances, "m", _HuffCode_createMapHelper).call(this, mapPair, currNode.right);
    }
};
exports.default = HuffCode;
