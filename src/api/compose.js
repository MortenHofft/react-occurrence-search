/**
 * Build an ES query based on the app representation of a filter. 
 * This is a subset of what is possible in ES and only generates search queries, not aggregations and similar.
 */
import bodybuilder from 'bodybuilder';
import { taxon } from './converters';
import { termFilter, termOrRangeFilter } from './converters/util';

const filters = {
  taxon: 'backbone.taxonKey',
  year: termOrRangeFilter('year')
  // not here, and it will be assumed to be a 1 to 1 mapping to a terms filter
}
/**
 * A query is expected to have format: {filterNameA: [1], filterNameB: ['a', 'b']}
 * A query can composed by adding one filter ad a time. the order of filters should not matter.
 * @param {*} query 
 */
function compose(query) {
  query = query || {};
  let builder = bodybuilder();
  // iterate all filters and add all to the builder
  Object.entries(query).forEach(([filterName, values]) => {
    const filterConverter = filters[filterName];
    if (filterConverter) {
      // if there exists an explicit mapping for this field, then use that
      if (typeof filterConverter === 'string') {
        // this should be considered a simple terms query with the string as the mapping to the ES field
        termFilter(filterConverter)(values, builder);
      } else {
        // this is a custom builder
        filters[filterName](values, builder);
      }
    } else {
      // Not a known filter with an explicit configuration
      // we have several options. 
      // 1 We can ignore the filter as it is unknown
      // 2 We can assume it is a terms filter
      // 3 We can test that it is all strings/numbers and then use a terms filter
      // 4 We can do 3 but also test against the _mappings (e.g. http://c6n1.gbif.org:9200/default-dynamic/_mapping)
      // The simplest solution for now is to assume that it is correctly configured and do 2.
      termFilter(filterName)(values, builder);
    }
  });
  return builder;
}

export default compose;