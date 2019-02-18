// Get as array. If undefined, then return empty array.
export const asArray = a => {
  if (typeof a === 'undefined') return [];
  return Array.isArray(a) ? a : [].concat(a);
}