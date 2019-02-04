import React, { Component } from "react";
import { ThemeProvider } from "react-jss";
import PropTypes from 'prop-types';

import App from './components/App';

const defaultTheme = {
  primary: "tomato",
};

const Root = ({theme, settings}) => {
  const mergedTheme = Object.assign({}, defaultTheme, theme);
  return (
    <ThemeProvider theme={mergedTheme}>
      <App settings={settings}/>
    </ThemeProvider>
  )
};

Root.propTypes = {
  theme: PropTypes.object,
  settings: PropTypes.object,
};

export default Root;