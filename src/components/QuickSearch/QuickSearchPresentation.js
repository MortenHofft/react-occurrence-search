import React, { Component } from 'react';
import ReactAutocomplete from 'react-autocomplete';
import injectSheet from 'react-jss';
import { FormattedMessage } from 'react-intl';
import StripeLoader from '../loaders/StripeLoader';

const ESCAPE_KEY = 27;

const menuStyle = {
  borderRadius: '3px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.2)',
  border: '1px solid #ddd',
  background: 'white',
  padding: '2px 0',
  fontSize: '90%',
  overflow: 'auto',
  maxHeight: '60vh',
  zIndex: '998',
};

class QuickSearch extends Component {
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
      this.suggestPromise = this.props.suggest(searchText, 3, this.props.intl);
      this.suggestPromise.then((suggestions) => {
          this.setState({ suggestions: suggestions, loading: false });
        })
        .catch((err) => {
          if (err.constructor.name !== 'Cancel') {
            this.setState({error: true, loading: false});
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
    const { classes } = this.props;

    const renderItem = (item, highlighted) => (
      <div className={highlighted ? classes.suggestHighlight : classes.suggestItem} key={`${item.type}_${item._key}`}>
        <div className={classes.itemTitle}>{item.title} <span className={classes.itemType}>{item._field}</span></div>
        {item.description && <div className={classes.itemDescription}>{item.description}</div>}
      </div>
    );

    const noResults = {
      disabled: true,
      title: <span className={classes.discreetInk}>
        <FormattedMessage
          id='noResultsForX'
          defaultMessage={'No results for {str}'}
          values={{ str: this.state.value }}
        />
      </span>
    };



    let items = this.state.loading ? [] : this.state.suggestions.length > 0 ? this.state.suggestions : [noResults];

    return (
      <React.Fragment>
        <div className={classes.searchBar}>
          <StripeLoader active={this.state.loading} error={this.state.error}/>
          <ReactAutocomplete
            autoHighlight={true}
            open={!!this.state.value && items.length > 0}
            // wrapperProps={{className: classes.searchBarSuggest}}
            renderMenu={children =>
              <div className={classes.suggestMenu}>
                {children}
              </div>
            }
            isItemSelectable={item => !item.disabled}
            wrapperStyle={{}}
            items={items}
            getItemValue={item => item.title}
            renderItem={renderItem}
            inputProps={{ placeholder: 'Scientific name, country or year range' }}
            inputProps={{ placeholder: 'Search', onBlur: this.onBlur, onKeyUp: this.onKeyUp }}
            value={this.state.value}
            menuStyle={menuStyle}
            onChange={e => this.onChange(e.target.value)}
            onSelect={(value, item) => this.onSelect(item)}
          />
        </div>
      </React.Fragment>
    );
  }
}

const styles = theme => {
  const suggestItem = {
    padding: 10
  };
  return {
    discreetInk: {
      color: '#aaa'
    },
    searchBar: {
      border: '1px solid #ddd',
      position: 'relative',
      zIndex: '50',
      borderRadius: 3,
      '& input': {
        display: 'block',
        width: '100%',
        padding: 10,
        border: 'none',
        borderRadius: 3
      }
    },
    suggestMenu: {
      position: 'absolute',
      borderRadius: 3,
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.2)',
      border: '1px solid #ddd',
      background: 'white',
      padding: '2px 0',
      overflow: 'auto',
      maxHeight: '60vh',
      width: '100%',
      zIndex: '998',
    },
    suggestItem,
    itemType: {
      fontSize: `${Math.round(theme.fontSizePx * 0.85)}px`,
      color: '#aaa'
    },
    itemTitle: {
      //fontSize: `${Math.round(theme.fontSizePx*0.85)}px`,
    },
    itemDescription: {
      fontSize: `${Math.round(theme.fontSizePx * 0.85)}px`,
      color: '#aaa'
    },
    suggestHighlight: {
      ...suggestItem,
      background: '#e5eff3'
    }
  };
}

export default injectSheet(styles)(QuickSearch);