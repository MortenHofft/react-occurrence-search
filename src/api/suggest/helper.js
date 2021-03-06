import axios from '../axios';

export const getEnumSuggest = conf => {
  return (q = '', limit = 5, intl) => {
    let p = axios.get(conf.endpoint);

    let p2 = p.then(response => {
      const namedResults = response.data.map(x => ({
        title: intl.formatMessage({ id: `${conf.translationNamespace}.${x}`, defaultMessage: x }),
        value: x,
        _key: `${conf.field}_${x}`,
        _field: conf.field
      }));
      const results = namedResults
        .filter(e =>
          q === '' || e.title
            .toLowerCase()
            .replace('_', ' ')
            .startsWith(q.toLowerCase())
        )
        .slice(0, limit);
        return results;
    }).catch(err => {
      throw err;
    });

    // allow the request to be cancelled
    p2.cancel = p.cancel;
    return p2;
  }
}

const yearRange = /^([0-9]{4})?-?([0-9]{4})?$/;
export const getYearSuggest = conf => {
  return async (q = '', limit = 5, intl) => {
    if (q !== '' && yearRange.test(q)) {
			const parts = q.split('-').filter(e => e !== '');
			const firstYear = parts[0];
			if (q.startsWith('-')) return [{
				title: `Before ${firstYear}`, 
				value: {lt: firstYear},
				_field: conf.field,
				_key: `${conf.field}_${q}`
			}];

			if (q.endsWith('-')) return [{
				title: `After ${firstYear}`, 
				value: {gte: firstYear},
				_field: conf.field,
				_key: `${conf.field}_${q}`
			}];

			if (parts.length === 1) return [{
				title: `${firstYear}`, 
				value: {gte: firstYear},
				_field: conf.field,
				_key: `${conf.field}_${q}`
			}];

			return [{
				title: `${firstYear}-${parts[1]}`, 
				value: {gte: firstYear, lt: parts[1]},
				_field: conf.field,
				_key: `${conf.field}_${q}`
			}];
		}
		return [];
  }
}
