import React, { Component } from "react";
import { render } from "react-dom";

import OccurrenceSearch from "../../src";

const themeBlue = {
  primary: "deepskyblue"
};

const themeRed = {
  primary: "tomato"
};

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themeBlue,
      locale: 'en'
    };
  }
  render() {
    return (
      <div>
        <div style={{padding: '10px', borderBottom: '1px solid #ddd'}}>
          <button onClick={() => this.setState({ theme: themeBlue })}>Blue</button>
          <button onClick={() => this.setState({ theme: themeRed })}>Red</button>
          <span style={{paddingRight: 10}}></span>
          <button onClick={() => this.setState({ locale: 'en' })}>English</button>
          <button onClick={() => this.setState({ locale: 'da' })}>Dansk</button>
        </div>
        <OccurrenceSearch locale={this.state.locale} theme={this.state.theme} />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
