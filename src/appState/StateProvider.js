// This file holds the majority of the app state: current filters, current view, update function etc.
import React from 'react';
import AppContext from './AppContext';
import api from '../api';
import TablePresentation from '../components/views/Table/TablePresentation';
import MapPresentation from '../components/views/Map/MapPresentation';
import { get } from 'lodash';
import { getFilterFromUrl, getUpdatedFilter, pushStateToUrl } from './stateHelper';
import { strToHash } from '../util/helpers';
import history from './history';

export const views = {
  TABLE: 'TABLE',
  GALLERY: 'GALLERY',
  MAP: 'MAP',
}

class StateProvider extends React.Component {
  constructor(props) {
    super(props);

    const components = {
      TableView: get(props, 'settings.components.TableView', TablePresentation),
      MapView: get(props, 'settings.components.MapView', MapPresentation),
    }

    let filter = getFilterFromUrl(window.location.search);
    this.unlisten = history.listen((location, action) => {
      this.updateStateFilter(getFilterFromUrl(location.search));
    });

    this.state = {
      appRef: React.createRef(),
      activeView: views.TABLE,
      filter,//{year: [2018, {gte: 1928, lt:1929}]}, // current filter
      stateApi: {
        updateView: this.updateView, // update the active view
        updateFilter: this.updateFilter, // updates a single field
        // updateQuery, // sets the full query
      },
      components,
      api
    }
  }

  updateView = selected => {
    if (!views[selected]) return;
    this.setState({ activeView: selected });
  }

  updateFilter = options => {
    const filter = getUpdatedFilter(this.state.filter, options);
    pushStateToUrl(filter);
  }

  updateStateFilter = filter => {
    const filterHash = strToHash(JSON.stringify(filter));
    this.setState({
      filter,
      filterHash
    });
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default StateProvider;