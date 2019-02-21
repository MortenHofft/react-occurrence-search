import {
  isNil,
  isObject,
  assign,
  get,
  pullAll,
  set,
  omitBy,
  isEmpty,
  uniqWith
} from 'lodash';
import isEqual from 'react-fast-compare';
import history from './history';
import { asArray, getParams } from '../util/helpers';

const maxFilterLength = 100;

export const pushStateToUrl = filter => {
  if (isEmptyQuery(filter)) {
    history.push(window.location.pathname);
  } else {
    const filterParam = getFilterAsURICompoment(filter);
    history.push(window.location.pathname + '?filter=' + filterParam);
    // TODO put long filter in localstoraage with an id
    // if (filterParam.length > maxFilterLength) {
    //   localStorage.setItem();
    //   history.push(window.location.pathname + '?filterId=' + getFilterAsURICompoment(filter));
    // } else {
    //   history.push(window.location.pathname + '?filter=' + getFilterAsURICompoment(filter));
    // }
  }
}

export const getStateFromUrl = ({ filter }) => {

}

export const getFilterAsURICompoment = filter => {
  filter.must = omitBy(filter.must || {}, isEmpty);
  filter.mustNot = omitBy(filter.mustNot || {}, isEmpty);
  filter = omitBy(filter || {}, isEmpty);
  return encodeURIComponent(JSON.stringify(filter));
};

export const getFilterFromUrl = location => {
  const query = getParams(location);
  const filter = query.filter ? JSON.parse(decodeURIComponent(query.filter)) : {};
  return assign({ mustNot: {}, must: {} }, filter)
};

export const isEmptyQuery = filter => {
  // if an object and either must or mustNot or q has data, then it isn't empty
  if (
    isObject(filter) &&
    (!isEmpty(filter.must) || !isEmpty(filter.mustNot) || filter.q)
  )
    return false;
  return true;
};

export const getUpdatedFilter = (immutableFilter, options) => {
  const { key, value, action = 'ADD', isNegated = false } = options;
  let filter = assign({}, immutableFilter);
  if (isNil(key) || isNil(action)) return filter;
  //'q' is a special case and is treated differently. Perhaps this should have a different method altogether
  if (key === 'q') {
    filter.freetext = action === 'ADD' ? value : undefined;
    return filter;
  }
  
  const type = isNegated ? 'mustNot' : 'must';
  const valueArray = asArray(value);

  let paramValues = asArray(get(filter, `${type}['${key}']`, []));
  if (action === 'CLEAR') {
    paramValues = '';
  } else if (action === 'ADD') {
    paramValues = uniqWith(paramValues.concat(valueArray), isEqual);
  } else if (action === 'UPDATE') {
    paramValues = uniqWith([].concat(valueArray), isEqual);
  } else if (action === 'REMOVE') {
    pullAll(paramValues, valueArray);
  } else {
    paramValues = valueArray;
  }

  set(filter, `${type}['${key}']`, paramValues);
  if (!paramValues || isEmpty(paramValues)) {
    delete filter[type][key];
  }
  if (isEmpty(filter[type])) {
    delete filter[type];
  }
  return filter;
};

export default {
  getFilterAsURICompoment,
  getUpdatedFilter,
  isEmptyQuery
};
