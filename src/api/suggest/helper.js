import axios from '../axios';

export const getEnumSuggest = conf => {
  return (q = '', limit = 5, intl) => {
    let p = axios.get(conf.endpoint);

    let p2 = p.then(response => {
      const namedResults = response.data.map(x => ({
        title: intl.formatMessage({ id: `enum.basisOfRecord.${x}`, defaultMessage: x }),
        value: x,
        _key: x,
        _field: 'basisOfRecord'
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

