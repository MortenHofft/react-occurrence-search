import React from 'react';
import withContext from '../../appState/withContext';
import { speciesSuggest, borSuggest } from './suggest';
import { injectIntl } from 'react-intl';

const Search = ({ components, intl, ...rest }) => {
  const QuickSearch = components.QuickSearch
  return <QuickSearch {...rest} suggest={borSuggest} intl={intl} />
}

const mapContextToProps = ({ filter, filterHash, stateApi, api, components }) => ({ filter, filterHash, updateFilter: stateApi.updateFilter, api, components });
export default withContext(mapContextToProps)(injectIntl(Search));