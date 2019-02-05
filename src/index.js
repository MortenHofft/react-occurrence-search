import React from "react";
import { ThemeProvider } from "react-jss";
import { IntlProvider, addLocaleData } from "react-intl";
import PropTypes from "prop-types";

import StateProvider from "./appState/StateProvider";
import App from "./components/App";
import en from "./locales/en";

const defaultTheme = {
  primary: "pink"
};

class OccurrenceSearch extends React.Component {
  constructor(props) {
    super(props);

    const locale = this.props.locale === "en" ? en : this.props.locale;
    const { intl, messages, locale: localeName } = locale;
    addLocaleData([...intl]);

    this.state = {
      theme: this.getTheme(),
      messages,
      locale
    };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.theme !== prevProps.theme) {
      this.setState({ theme: this.getTheme() });
    }
    if (this.props.locale !== prevProps.locale) {
      this.setLocaleData();
    }
  }

  getTheme() {
    // Merged the default config with the user provided one
    return Object.assign({}, defaultTheme, this.props.theme);
  }

  setLocaleData = () => {
    const locale = this.props.locale === "en" ? en : this.props.locale;
    const { intl, messages, locale: localeName } = locale;
    addLocaleData([...intl]);
    this.setState({ messages, locale: localeName });
  };

  render() {
    const { settings } = this.props;

    return (
      <StateProvider>
        <IntlProvider locale={this.state.locale} messages={this.state.messages}>
          <ThemeProvider theme={this.state.theme}>
            {this.state.messages && <App settings={settings} />}
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

const Test = () => <div>Hej</div>;
export { OccurrenceSearch, Test };
