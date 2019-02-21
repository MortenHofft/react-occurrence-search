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

