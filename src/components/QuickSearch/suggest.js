import React from 'react';
import axios from 'axios';
import axiosCancel from '../../api/axios';
import qs from 'querystringify';
import { promiseAll } from '../../util/helpers';

let CancelToken = axios.CancelToken;

export const suggest = str => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(items.filter(x => x.title.startsWith(str))), 1000);
  });
};

const items = [
  {
    title: 'Basidiomycota',
    field: 'taxon',
    description: <div>Kingdom > phylum > class > order > family > genus</div>,
    _key: 34,
    value: 34
  },
  {
    title: 'Denmark',
    field: 'countryCode',
    _key: 'DK',
    value: 'DK'
  },
  {
    title: '1981-2010',
    field: 'year',
    _key: '1981-2010', //1981 <= year <2019
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

export const speciesSuggest = (q, limit) => {
  let p = axiosCancel.get('//api.gbif.org/v1/species/suggest' + qs.stringify({ q, limit }, true));
  let p2 = p.then(response => {
    const result = response.data;
    return result.map((item, index) => ({
      title: item.scientificName,
      value: item.key,
      _key: index,
      _field: 'taxon'
    }));
  }).catch(err => {
    throw err;
  });
  p2.cancel = p.cancel;
  return p2;
}

import {getEnumSuggest, getYearSuggest} from '../../api/suggest/helper';
// export const borSuggest = getEnumSuggest({endpoint: '//api.gbif.org/v1/enumeration/basic/Country', field: 'countryCode', translationNamespace: 'enum.country'})
// export const borSuggest = getYearSuggest({field: 'year', translationNamespace: 'enum.country'})
//export const borSuggest = getEnumSuggest({endpoint: '//api.gbif.org/v1/enumeration/basic/BasisOfRecord', field: 'basisOfRecord'})

const countrySuggest = getEnumSuggest({endpoint: '//api.gbif.org/v1/enumeration/basic/Country', field: 'countryCode', translationNamespace: 'enum.country'})
const yearSuggest = getYearSuggest({field: 'year'})

export const suggestMany = (q, limit, intl) => {
  const countryP = countrySuggest(q, limit, intl);
  const yearP = yearSuggest(q, limit, intl);
  const speciesP = speciesSuggest(q, limit, intl);
  const p = promiseAll([speciesP, countryP, yearP]);
  let p2 = p.then(results => [...results[0], ...results[1], ...results[2]]);
  p2.cancel = () => {speciesP.cancel(); countryP.cancel();}
  return p2;
}