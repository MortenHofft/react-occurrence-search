import {
  isNil,
  isObject,
  assign,
  get,
  pullAll,
  set,
  omitBy,
  isEmpty,
  uniq
} from 'lodash';
import { asArray, getParams } from '../util/helpers';

export const getFilterAsURICompoment = filter => {
  // filter.must = omitBy(filter.must || {}, isEmpty);
  // filter = omitBy(filter || {}, isEmpty);
  return encodeURIComponent(JSON.stringify(filter));
};

export const getFilterFromUrl = location => {
  const query = getParams(location);
  if (query.filter) {
    return JSON.parse(decodeURIComponent(query.filter));
  }
  return {};
};

export const isEmptyQuery = filter => {
  // if an object and either must or must_not or q has data, then it isn't empty
  if (
    isObject(filter) &&
    (!isEmpty(filter.must) || !isEmpty(filter.must_not) || filter.q)
  )
    return false;
  return true;
};

export const getUpdatedFilter = (immutableFilter, options) => {
  const { key, value, action, isNegated } = options;
  let filter = assign({}, immutableFilter);
  if (isNil(key) || isNil(action)) return filter;
  //'q' is a special case and is treated differently. Perhaps this should have a different method altogether
  if (key === 'q') {
    filter.freetext = action === 'ADD' ? value : undefined;
    return filter;
  }
  const type = isNegated ? 'must_not' : 'must';
  const valueArray = asArray(value);

  let paramValues = asArray(get(filter, `${type}['${key}']`, []));
  if (action === 'CLEAR') {
    paramValues = '';
  } else if (action === 'ADD') {
    paramValues = uniq(paramValues.concat(value));
  } else if (action === 'UPDATE') {
    paramValues = uniq([].concat(value));
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
