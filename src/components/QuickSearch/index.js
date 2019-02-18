import React, { Component } from 'react';
import ReactAutocomplete from 'react-autocomplete';
import injectSheet from 'react-jss';

// import MultiSuggest from './MultiSuggest';
// import ModalFilter from '../ModalFilter';

// const ARROW_DOWN_KEY = 40;
// const ARROW_UP_KEY = 37;
// const ESCAPE_KEY = 27;
// const ENTER_KEY = 13;

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

    // this.onChange = this.onChange.bind(this);
    // this.onKeyUp = this.onKeyUp.bind(this);
    // this.onBlur = this.onBlur.bind(this);
    // this.handleShow = this.handleShow.bind(this);
    // this.handleHide = this.handleHide.bind(this);

    // this.suggester = MultiSuggest();

    this.state = { value: '' };
  }

  onChange = searchText => {
    this.setState({
      value: searchText,
      suggestions: [
        {}
      ]
    });
    // the suggester is expected to return 
    // this.suggester(val)
    //   .then((suggestions) => {
    //     this.setState({suggestions: suggestions});
    //   })
    //   .catch((err) => (console.log(err)));
    // }
  }

  // onChange(val) {
  //   this.setState({ value: val });
  //   this.getSuggestions(val);
  //   if (val.length > 2) {
  //   this.suggester(val)
  //     .then((suggestions) => {
  //       this.setState({suggestions: suggestions});
  //     })
  //     .catch((err) => (console.log(err)));
  //   } else {
  //     this.setState({suggestions: []});
  //   }
  // }

  // onSelect(item) {
  //   let val = item.field;
  //   this.setState({ value: val });
  //   if (item.type === 'FIELD') {
  //     this.setState({showModal: true, modalField: val});
  //   } else if (item.type === 'VALUE') {
  //     this.props.updateFilter({key: item.field, value: item.key, action: 'ADD'});
  //   }

  //   this.setState({forceOpen: false, value: '', suggestions: []});
  // }

  // onKeyUp(e) {
  //   if (e.keyCode === ARROW_DOWN_KEY || e.keyCode === ARROW_UP_KEY) {
  //     this.setState({forceOpen: true});
  //   } else if(e.keyCode === ESCAPE_KEY) {
  //     this.setState({forceOpen: false });
  //   } else if(e.keyCode === ENTER_KEY && e.target.value && e.target.value !== '') {
  //     this.props.updateFilter({key: 'freetext', value: e.target.value, action: 'ADD'});
  //     // this.setState({forceOpen: false, value: '' });
  //   }
  // }

  // onBlur() {
  //   this.setState({forceOpen: false, value: '', suggestions: []});
  // }

  // handleShow() {
  //   this.setState({showModal: true});
  // }

  // handleHide() {
  //   this.setState({showModal: false});
  // }

  render() {
    const { classes } = this.props;
    // let renderItem = function (item, highlighted) {
    //   switch (item.type) {
    //     case 'HEADER' :
    //       return (
    //         <div key={ 'col_' + item.name} className={classes.searchBarSuggest_row + ' ' + classes.searchBarSuggest_row_disabled}>
    //           <div>{item.col1}</div>
    //           <div>{item.col2}</div>
    //         </div>
    //       );
    //     case 'FIELD' :
    //       return (
    //         <div key={ 'field_' + item.field} style={{ backgroundColor: highlighted ? '#d3dce0' : undefined }} className={classes.searchBarSuggest_row} >
    //           <div><span className={classes.fieldName}>{item.field}</span></div>
    //           <div className={classes.fieldDescription}>{item.description}</div>
    //         </div>
    //       );
    //     default :
    //     return (
    //       <div key={ 'value_' + item.field + '_' + item.key} className={classes.searchBarSuggest_row + ' reverse'} style={{ backgroundColor: highlighted ? '#d3dce0' : undefined }}>
    //         <div>
    //           <div className={classes.fieldValue}>
    //             {item.value}
    //           </div>
    //           <div className={classes.fieldDescription}>
    //             {item.description}
    //           </div>
    //         </div>
    //         <div><a className={classes.fieldName}>{item.field}</a></div>
    //       </div>
    //     );
    //   }
    // };

    // let items = _.filter(this.state.fieldSuggestions, (item) => (item.field.startsWith(this.state.value || '') || item.disabled));
    // if (items.length > 0) {
    //   items.unshift(
    //     {
    //       type: 'HEADER',
    //       name: 'fieldSuggestions',
    //       col1: 'Field',
    //       col2: 'Description',
    //       disabled: true
    //     }
    //   );
    // }
    // if (_.isArray(this.state.suggestions) && this.state.suggestions.length > 0) {
    //   items.push({
    //     type: 'HEADER',
    //     col1: 'Value',
    //     name: 'valueSuggestions',
    //     col2: 'Field',
    //     disabled: true
    //   });
    //   items = _.concat(items, this.state.suggestions);
    // }

    const items = [
      {
        title: 'Basidiomycota',
        field: 'gbifTaxonKey',
        description: <div>Kingdom > phylum > class > order > family > genus</div>,
        id: 143,
        value: 143
      },
      {
        title: 'Denmark',
        field: 'country',
        id: 'DK',
        value: 'DK'
      },
      {
        title: '1981-2019',
        field: 'year',
        id: '1981-2019',
        value: { gte: 1981, lt: 2019 }
      }
    ];
    
    const renderItem = (item, highlighted) => (
      <div className={highlighted ? classes.suggestHighlight : classes.suggestItem} key={`${item.type}_${item.id}`}>
        <div className={classes.itemTitle}>{item.title} <span className={classes.itemType}>{item.field}</span></div>
        {item.description && <div className={classes.itemDescription}>{item.description}</div>}
      </div>
    );

    return (
      <React.Fragment>
        <div className={classes.searchBar}>
          <ReactAutocomplete
            // open={!!this.state.value || this.state.forceOpen}
            autoHighlight={true}
            // wrapperProps={{className: classes.searchBarSuggest}}
            renderMenu={children =>
              <div className={classes.suggestMenu}>
                {children}
              </div>
            }
            // isItemSelectable={item => !item.disabled}
            wrapperStyle={{}}
            items={items}
            getItemValue={item => item.title}
            renderItem={renderItem}
            inputProps={{ placeholder: 'Scientific name, country or year range' }}
            // inputProps={{ placeholder: 'Search', onKeyUp: this.onKeyUp, onBlur: this.onBlur }}
            value={this.state.value}
            menuStyle={menuStyle}
            onChange={e => this.onChange(e.target.value)}
          // onSelect={value => this.onSelect(value)}
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
      background: '#eee'
    }
  };
}
export default injectSheet(styles)(QuickSearch);