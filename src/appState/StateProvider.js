// This file holds the majority of the app state: current filters, current view, update function etc.
import React from 'react';
import AppContext from './AppContext';
import api from '../api';
import TablePresentation from '../components/views/Table/TablePresentation';
import MapPresentation from '../components/views/Map/MapPresentation';
import { get, assign } from 'lodash';
import { getFilterAsURICompoment } from './stateHelper';

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

    this.state = {
      appRef: React.createRef(),
      activeView: views.TABLE,
      filter: {},//{year: [2018, {gte: 1928, lt:1929}]}, // current filter
      stateApi: {
        updateView: this.updateView, // update the active view
        addToFilter: this.addToFilter, // updates a single field
        // updateQuery, // sets the full query
      },
      components,
      api
    }
  }

  updateView = selected => {
    if (!views[selected]) return;
    this.setState({activeView: selected});
  }

  addMustFilter = (filterName, values) => {
    /*
     get full updated filter
     update url 
     */
    // const newValues = [...new Set(values)];
    // const query = assign({}, this.state.filter.query, {[filterName]: newValues})
    // updateQuery(query);
  }

  updateFilterInUrl = filter => {
    if (stateHelper.isEmptyQuery(query)) {
      history.push(window.location.pathname);
    } else {
      history.push(window.location.pathname + '?filter=' + stateHelper.getFilterAsURICompoment(query));
    }
  }

  updateQuery(query) {
    if (Object.keys(query).length === 0) {
      history.push(window.location.pathname);
    } else {
      history.push(window.location.pathname + '?filter=' + getFilterAsURICompoment(query));
    }
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