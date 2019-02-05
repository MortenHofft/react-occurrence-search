import React from "react";
import { ThemeProvider } from "react-jss";
import { IntlProvider, addLocaleData } from "react-intl";
import PropTypes from "prop-types";

import StateProvider from "./appState/StateProvider";
import App from "./components/App";
import en from "./locales/en";

const defaultTheme = {
  primary: "pink",
  fontSizePx: 14
};

class OccurrenceSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: this.getTheme(),
      ...this.getLocaleData()
    };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.theme !== prevProps.theme) {
      this.setState({ theme: this.getTheme() });
    }
    if (this.props.locale !== prevProps.locale) {
      this.setState({ ...this.getLocaleData() });
    }
  }

  getTheme() {
    // Merged the default config with the user provided one
    return Object.assign({}, defaultTheme, this.props.theme);
  }

  getLocaleData() {
    const locale = this.props.locale === "en" ? en : this.props.locale;
    const { intl, messages, locale: localeName } = locale;
    addLocaleData([...intl]);
    return { messages, locale: localeName };
  }

  render() {
    const { settings } = this.props;

    return (
      <StateProvider settings={settings}>
        <IntlProvider locale={this.state.locale} messages={this.state.messages}>
          <ThemeProvider theme={this.state.theme}>
            <App settings={settings} />
          </ThemeProvider>
        </IntlProvider>
      </StateProvider>
    );
  }
}

OccurrenceSearch.propTypes = {
  theme: PropTypes.object,
  settings: PropTypes.object,
  locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default OccurrenceSearch;
