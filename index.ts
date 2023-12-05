import HuffCode from "./classes/HuffCode";

export function encodeForFunSharableText(textToEncode: string) {
  const hc = new HuffCode();

  console.log(textToEncode);

  hc.init(textToEncode);

  const compressedBits = hc.encode(textToEncode);
  const compressionMap = hc.createMap();
  const linkedResult = `${compressedBits}:${compressionMap}`;

  console.log(linkedResult);

  return btoa(linkedResult);
}

export function decodeForFunSharableText(textToDecode: string) {
  const hc = new HuffCode();
  const fromBase64Text = atob(textToDecode);
  const splitterIndex = fromBase64Text.indexOf(":");
  const compressedBits = fromBase64Text.substring(0, splitterIndex);
  const compressionMap = fromBase64Text.substring(splitterIndex + 1);

  hc.init(compressionMap, "map");

  return hc.decode(compressedBits);
}

/** HuffmanEncoding is used to compress text with repeating characters losslessly. */

function main() {
  const text = "Mr. Owl ate my metal worm.";
  const encodedText = encodeForFunSharableText(text);
  const decodedText = decodeForFunSharableText(encodedText);

  console.log("E/D:", encodedText, decodedText);
} // base64 is actually used to turn bits into ascii to prevent communication issues that might confuse payload data with communication bits.

export default HuffCode;

/** NOTES
 * - huffman example: https://youtu.be/iEm1NRyEe5c
 * - output: compressed bits and freq pairs (ie: 00111...:m3::r2:: 5::w2::...)
 * - flow: create test text > read test text > create freq map > create priority list from freq map > create tree from freq map > encode > return compressed bits and 
 * - order of how tree is made: based on ascii char code sorting, then freq in asc order
 * - "Mr. Owl ate my metal worm.": y (1) -> o (1) -> O (1) -> M (1) -> w (2) -> t (2) -> r (2) -> l (2) -> e (2) -> a (2) -> . (2) -> m (3) ->   (5) -> null
 * 
 * -----------------------------------------------------------------------------------------------------------------------------
 * Data structures needed: node, binary tree, linked list
 */
