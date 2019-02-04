import React from 'react';
import { ThemeProvider } from 'react-jss';
import { IntlProvider, addLocaleData } from 'react-intl';
import PropTypes from 'prop-types';

import StateProvider from './appState/StateProvider';
import App from './components/App';

const defaultTheme = {
  primary: 'pink'
};

// The internationalization library need to load the locales. 
// And since we do not want to include all languages for all we need to do it async
const reactIntlLocaleData = {
  da: () => import('react-intl/locale-data/da'),
  en: () => import('react-intl/locale-data/en')
};

// The translated messages and enumerations need async loading as well
const localeMessages = {
  da: () => import('./locales/da'),
  en: () => import('./locales/en')
};

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: this.getTheme()
    };
  }

  componentDidMount() {
    this._isMount = true;
    this.loadLocaleData(this.props.locale);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.theme !== prevProps.theme) {
      this.setState({theme: this.getTheme()});
    }
    if (this.props.locale !== prevProps.locale) {
      this.loadLocaleData(this.props.locale);
    }
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  getTheme() {
    // Merged the default config with the user provided one
    return Object.assign({}, defaultTheme, this.props.theme);
  }

  loadLocaleData = async locale => {
    this.setState({ loadingLocale: true });
    const [intlData, messages] = await Promise.all([
      reactIntlLocaleData[locale](),
      localeMessages[locale]()
    ]);
    if (this._isMount) {
      addLocaleData([...intlData.default]);
      this.setState({ messages, loadingLocale: false });
    }
  };

  render() {
    const { settings, locale = 'en' } = this.props;

    return (
      <StateProvider>
        <IntlProvider locale={locale} messages={this.state.messages}>
          <ThemeProvider theme={this.state.theme}>
            {this.state.messages && <App settings={settings} />}
          </ThemeProvider>
        </IntlProvider>
      </StateProvider>
    );
  }
}

Root.propTypes = {
  theme: PropTypes.object,
  settings: PropTypes.object,
  locale: PropTypes.string
};

export default Root;
