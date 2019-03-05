import React from 'react';
import ReactAutocomplete from 'react-autocomplete';
import injectSheet from 'react-jss';
import { FormattedMessage } from 'react-intl';
import StripeLoader from '../loaders/StripeLoader';

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

const QuickSearch = props => {
  const { classes, options } = props;
  const { loading, error, suggestions, value, onChange, onSelect, onBlur, onKeyUp } = options;

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
        values={{ str: value }}
      />
    </span>
  };

  let items = loading ? [] : suggestions.length > 0 ? suggestions : [noResults];

  return (
    <React.Fragment>
      <div className={classes.searchBar}>
        <StripeLoader active={loading} error={error} />
        <ReactAutocomplete
          autoHighlight={true}
          open={!!value && items.length > 0}
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
          inputProps={{ placeholder: 'Search', onBlur: onBlur, onKeyUp: onKeyUp }}
          value={value}
          menuStyle={menuStyle}
          onChange={e => onChange(e.target.value)}
          onSelect={(value, item) => onSelect(item)}
        />
      </div>
    </React.Fragment>
  );
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
      color: '#aaa',
      border: '1px solid #aaa',
      padding: '2px 5px',
      background: '#efefef',
      borderRadius: 3,
      marginLeft: 10
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