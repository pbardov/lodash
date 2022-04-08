import stringToSPath from './stringToSPath.js'

/**
 * Casts `value` to a super-path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castSPath(value) {
  return Array.isArray(value) ? value : stringToSPath(value)
}

export default castSPath
