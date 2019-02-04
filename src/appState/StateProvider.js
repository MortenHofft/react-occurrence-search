// This file holds the majority of the app state: current filters, current view, update function etc.
import React from 'react';

import AppContext from './AppContext';

class StateProvider extends React.Component {
  constructor(props) {
    super(props);
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