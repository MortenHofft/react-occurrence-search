import React, { Component } from "react";
import withContext from "../../../appState/withContext";
import _get from 'lodash/get';
import EnumFilterSimplePresentation from './enumFilterSimplePresentation';
import FilterBox from '../FilterBox';

class EnumFilterSimple extends Component {
  constructor(props) {
    super(props);
    const options = this.createOptions();

    this.state = {
      options: options,
      isDifferentFromFilter: false
    }
  }

  createOptions = () => {
    const options = this.props.options || [];
    const filter = this.props.filter.must[this.props.filterKey] || [];
    return options.map(name => {
      const selected = filter.includes(name);
      return { name: name, selected: selected, inFilter: selected }
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter.must[this.props.filterKey] !== this.props.filter.must[this.props.filterKey]) {
      this.setState({options: this.createOptions()});
    }
  }

  toggle = name => {
    const options = this.state.options.map(x => {
      return { ...x, selected: x.name === name ? !x.selected : x.selected }
    });

    this.updateOptions(options);
  }

  apply = () => {
    this.props.updateFilter({key: this.props.filterKey, value: this.state.options.filter(x => x.selected).map(x => x.name), action: 'UPDATE'});
  }

  updateOptions = options => {
    let isDifferentFromFilter = false;
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.selected !== option.inFilter) {
        isDifferentFromFilter = true;
        break;
      }
    }
    this.setState({ isDifferentFromFilter, options });
  }

  render() {
    return (
      <FilterBox title={'Evidence'} apply={this.apply} isDifferentFromFilter={this.state.isDifferentFromFilter} >
        <EnumFilterSimplePresentation options={this.state.options} toggle={this.toggle} isDifferentFromFilter={this.state.isDifferentFromFilter} />
      </FilterBox>
    )
  }
}

const mapContextToProps = ({ filter, filterHash, api, stateApi, components }) => ({ filter, filterHash, api, components, updateFilter: stateApi.updateFilter });
export default withContext(mapContextToProps)(EnumFilterSimple);
