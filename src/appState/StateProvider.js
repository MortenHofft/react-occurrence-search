// This file holds the majority of the app state: current filters, current view, update function etc.
import React from 'react';
import AppContext from './AppContext';

export const views = {
  TABLE: 'TABLE',
  GALLERY: 'GALLERY',
  MAP: 'MAP',
}

class StateProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appRef: React.createRef(),
      activeView: 'TABLE',
      // filter, // current filter
      api: {
        updateView: this.updateView, // update the active view
        // updateFilter, // updates a single field
        // updateQuery, // sets the full query
      }
    }
  }

  updateView = selected => {
    if (!views[selected]) return;
    this.setState({activeView: selected});
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