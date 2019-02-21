import axios from '../axios';
import qs from 'querystringify';

const config = {
  datasetKey: {
    type: 'KEY',
    endpoint: '//api.gbif.org/v1/dataset/suggest',
    key: 'key',
    title: 'title'
  },
  taxon: {
    type: 'KEY',
    endpoint: '//api.gbif.org/v1/species/suggest',
    key: 'key',
    title: 'scientificName',
    description: function(item) {
      let classification = '';
      [
        'kingdom',
        'phylum',
        'class',
        'order',
        'family',
        'genus',
        'species'
      ].forEach(function(rank) {
        if (item[rank]) {
          if (classification !== '') {
            classification += ' ❯ ';
          }
          classification += item[rank];
        }
      });
      return classification;
    }
  },
  basisOfRecord: {
    type: 'ENUM',
    endpoint: '//api.gbif.org/v1/enumeration/basic/BasisOfRecord'
  },
  issue: {
    type: 'ENUM',
    endpoint: '//api.gbif.org/v1/enumeration/basic/OccurrenceIssue'
  },
  countryCode: {
    type: 'ENUM',
    endpoint: '//api.gbif.org/v1/enumeration/basic/Country'
  },
  institutionCode: {
    type: 'STRING',
    endpoint: '//api.gbif.org/v1/occurrence/search/institutionCode'
  }
};

// Shared suggest API: (q, limit, intl) => [{key, title, description}]
let suggest = {};
for (let key in config) {
  const conf = config[key];
  if (conf.type === 'KEY') {
    suggest[key] = (q, limit, intl) =>
      axios.get(conf.endpoint + qs.stringify({ q, limit }, true)).then(response => {
        const result = response.data;
        let description = conf.description || (() => undefined);
        return {
          key: result[conf.key || 'key'],
          title: result[conf.title],
          description: description(result)
        };
      });
  }
  if (conf.type === 'ENUM') {
    suggest[key] = (q, limit, intl) =>
      axios.get(conf.endpoint + qs.stringify({ q, limit }, true)).then(response => {
        return response.data
          .filter(e =>
            e
              .toLowerCase()
              .replace('_', ' ')
              .startsWith(searchText.toLowerCase())
          )
          .slice(0, 2);
      });
  }
}

export default {
  config,
  suggest
};

/*
a generic suggest needs to take an intl param to translate enums.
should be easy to add a new suggest. should ideally be possible for consumers to add one as easily
(and it should support cancelleation)
q, limit, intl (for translating enums), filter (if suggest supports filtered suggests), api (for building the filter), 
*/