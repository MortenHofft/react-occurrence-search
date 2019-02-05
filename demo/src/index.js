import React, { Component } from "react";
import { render } from "react-dom";

import OccurrenceSearch from "../../src";
import da from '../../src/locales/da';

const themeBlue = {
  primaryColor: "#00bfff"
};

const themeRed = {
  primaryColor: "tomato"
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
          <button onClick={() => this.setState({ locale: da })}>Dansk</button>
        </div>
        <div style={{height: 'calc(100vh - 63px)'}}>
          <OccurrenceSearch locale={this.state.locale} theme={this.state.theme} />
        </div>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
