import React, { Component } from 'react';
import withContext from '../../appState/withContext';
import { speciesSuggest, suggestMany } from './suggest';
import { injectIntl } from 'react-intl';

const ESCAPE_KEY = 27;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', suggestions: [] };
  }

  onChange = searchText => {
    if (this.suggestPromise) {
      if (typeof this.suggestPromise.cancel === 'function') this.suggestPromise.cancel('New input');
      else console.warn('Suggest endpoint do not support cancellation. This can lead to racing conditions');
    }
    if (searchText === '') {
      this.setState({
        value: searchText,
        suggestions: [
        ],
        loading: false
      });
    } else {
      this.setState({
        value: searchText,
        suggestions: [
        ],
        loading: true
      });
      this.suggestPromise = suggestMany(searchText, 3, this.props.intl);
      this.suggestPromise.then((suggestions) => {
        this.setState({ suggestions: suggestions, loading: false });
      })
        .catch((err) => {
          if (err.constructor.name !== 'Cancel') {
            this.setState({ error: true, loading: false });
          }
        });
    }
  }

  onSelect = item => {
    this.props.updateFilter({ key: item._field, value: item.value });
    this.setState({ value: '', suggestion: [] });
  }

  onBlur = () => {
    this.setState({ value: '', suggestions: [] });
  }

  onKeyUp = e => {
    if (e.keyCode === ESCAPE_KEY) {
      this.setState({ value: '' });
    }
  }

  render() {
    const { components, intl, ...rest } = this.props;
    const QuickSearch = components.QuickSearch;
    const options = {loading: this.state.loading, error: this.state.error, value: this.state.value, suggestions: this.state.suggestions, onChange: this.onChange, onSelect: this.onSelect, onBlur: this.onBlur, onKeyUp: this.onKeyUp};
    return <QuickSearch {...rest} suggest={suggestMany} intl={intl} options={options} />
  }
}

const mapContextToProps = ({ filter, filterHash, stateApi, api, components }) => ({ filter, filterHash, updateFilter: stateApi.updateFilter, api, components });
export default withContext(mapContextToProps)(injectIntl(Search));