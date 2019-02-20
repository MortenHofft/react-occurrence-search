/**
 * Get as array. If undefined, then return empty array. nulls are kept
 * @param {Array | string | number} a 
 */
export const asArray = a => {
	if (typeof a === 'undefined') return [];
	return Array.isArray(a) ? a : [].concat(a);
}

/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
export const getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

//source: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
export const strToHash = function (str) {
	var hash = 0, i, chr;
	if (str.length === 0) return hash;
	for (i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};

export const promiseAll = async obj => {
  if (Array.isArray(obj)) return Promise.all(obj);
  // else map the obj
  const keys = Object.keys(obj);
  const promises = keys.map(key => obj[key]);
  const results = await Promise.all(promises);
  // map back to obj
  let mappedPromises = {};
  keys.forEach((key, index) => {
    mappedPromises[key] = results[index];
  });
  return mappedPromises;
};