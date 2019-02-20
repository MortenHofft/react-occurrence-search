import axios from 'axios';
import qs from 'querystringify';
import { promiseAll } from '../../util/helpers';

let CancelToken = axios.CancelToken;

export const suggest = str => {
  return new Promise((resolve, reject) => {
    resolve(items.filter(x => x.title.startsWith(str)));
  });
};

const items = [
  {
    title: 'Basidiomycota',
    field: 'taxon',
    description: 'Kingdom > phylum > class > order > family > genus',
    id: 34,
    value: 34
  },
  {
    title: 'Denmark',
    field: 'countryCode',
    id: 'DK',
    value: 'DK'
  },
  {
    title: '1981-2010',
    field: 'year',
    id: '1981-2010', //1981 <= year <2019
    value: { gte: 1981, lt: 2010 }
  }
];

import config from '../../api/suggest/suggest.conf';
let suggestConfig = config.suggest;

function MultiSuggest() {
  let cancel;
  let suggester = async function(searchText, limit) {
    //first of - cancel pending requests for suggestions
    if (cancel !== undefined) {
      cancel();
    }
    //construct search query
    let filter = { limit: limit || 2, q: searchText };
    let cancelToken = new CancelToken(function executor(c) {
      cancel = c;
    });

    let suggestPromises = {};
    Object.keys(suggestConfig).forEach(function(field) {
      let url = suggestConfig[field].endpoint + qs.stringify(filter, true);
      suggestPromises[field] = axios
        .get(url, {
          cancelToken: cancelToken
        })
        .then(function(response) {
          if (suggestConfig[field].type === 'ENUM') {
            return response.data
              .filter(e =>
                e
                  .toLowerCase()
                  .replace('_', ' ')
                  .startsWith(searchText.toLowerCase())
              )
              .slice(0, 2);
          } else {
            return response.data.slice(0, filter.limit);
          }
        });
    });

    return promiseAll(suggestPromises).then(function(result) {
      console.log(result);
      return result;
      //   let list = [];
      //   Object.keys(result).forEach(function(field) {
      //     let mapper;
      //     if (
      //       suggestConfig[field].type === 'ENUM' ||
      //       suggestConfig[field].type === 'STRING'
      //     ) {
      //       mapper = e => ({ type: 'VALUE', field: field, key: e, value: e });
      //     } else {
      //       let description =
      //         suggestConfig[field].description || (e => undefined);
      //       mapper = e => ({
      //         type: 'VALUE',
      //         field: field,
      //         key: e[suggestConfig[field].key],
      //         value: e[suggestConfig[field].title],
      //         description: description(e)
      //       });
      //     }
      //     let mappedSuggestions = result[field].map(mapper);
      //     list = list.concat(mappedSuggestions);
      //   });
      //   return list;
    });
  };

  return suggester;
}

export default MultiSuggest;
