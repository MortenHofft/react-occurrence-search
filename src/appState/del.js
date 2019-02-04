import React from 'react';
import ComponentContext from '.';

class ContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <ComponentContext.Provider value={this.state}>
        {this.props.children}
      </ComponentContext.Provider>
    );
  }
}

export default ContextProvider;