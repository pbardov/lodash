/**
 * Converts `string` to a property super-path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
function stringToSPath(string) {
  const path = [];
  const parrents = new Map();
  let current = path;
  for (const [, key, op] of string.matchAll(
    /(.*?)(>=|<=|[\.\[\]:!\?%><]|$)/g
  )) {
    const sub = [key, op];
    if (!key && !op) continue;
    current.push(sub);
    switch (op) {
      case "[": {
        parrents.set(sub, current);
        current = sub;
        break;
      }
      case "]": {
        if (parrents.has(current)) {
          const prev = current;
          current = parrents.get(prev);
          parrents.delete(prev);
        }
        break;
      }
      case ".":
      default:
        break;
    }
  }
  return path;
}
export default stringToSPath;
