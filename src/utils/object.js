/**
 * Get the copy of object without attributes.
 *
 * @param obj
 * @param attrsToExclude
 */
export function withoutAttrs(obj, attrsToExclude) {
  if (Array.isArray(obj)) {
    throw new TypeError('withoutAttrs() expects first argument to be a plain object, array given.');
  }

  const result = {};

  Object.keys(obj).forEach(key => {
    if (!attrsToExclude.includes(key)) {
      result[key] = obj[key];
    }
  });

  return result;
}

/**
 * Get the copy of object with only specified attributes.
 *
 * @param obj
 * @param attrs
 */
export function withOnlyAttrs(obj, attrs) {
  const result = {};

  Object.keys(obj).forEach(key => {
    if (attrs.includes(key)) {
      result[key] = obj[key];
    }
  });

  return result;
}
