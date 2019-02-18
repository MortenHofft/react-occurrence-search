import React, { Component } from 'react';
import injectSheet from 'react-jss';
import withContext from '../appState/withContext';
import Layout from './Layout';
import QuickSearch from './QuickSearch';
import AppMenu from './AppMenu';
import Table from './views/Table';

class App extends Component {
  constructor(props) {
    super(props);
    const { classes, appRef } = props;

    // Add styling clues
    // We will only show outlines if it is a keyboard user. Else all those blue outlines is a bit much.
    document.body.addEventListener('mousedown', () => {
      appRef.current.classList.add(classes.mouseUser);
    });
    document.body.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        appRef.current.classList.remove(classes.mouseUser);
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div ref={this.props.appRef} className={classes.app}>
        <Layout
          activeView={this.props.activeView}
          quickSearch={<QuickSearch />}
          filterSummary={<div>Filters</div>}
          widgetDrawer={<div>widgets</div>}
          table={<Table />}
          map={<div>Map</div>}
          gallery={<div>Gallery</div>}
          appMenu={<AppMenu />}
        />
      </div>
    );
  }
}

const styles = theme => {
  return {
    mouseUser: {
      '& :focus, :active': {
        outline: 'none' // We will only show outlines if it is a keyboard user. Else all those blue outlines is a bit much.
      }
    },
    app: {
      position: 'relative',
      background: '#f2f6f9',
      height: '100%',
      color: '#2e3c43',
      fontSize: `${theme.fontSizePx}px`,
      boxSizing: 'border-box',
      fontSmoothing: 'antialiased',
      fontFamily: 'Open sans, BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
      //fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
      //overflow: 'hidden',
      '& ::-webkit-scrollbar': {
        width: 6,
        height: 6
      },
      '& ::-webkit-scrollbar-track': {
        background: '#ddd'
      },
      '& ::-webkit-scrollbar-thumb': {
        background: '#888'
      },
      '& *': {
        boxSizing: 'border-box'
      },
      display: 'flex',
      flexDirection: 'column',
      '& .tooltip:hover': {
        position: 'relative',
        '&[tip]:before': {
          borderRadius: '2px',
          backgroundColor: '#585858',
          color: '#fff',
          content: 'attr(tip)',
          fontSize: '12px',
          padding: '5px 7px',
          position: 'absolute',
          whiteSpace: 'nowrap',
          zIndex: 25,
          lineHeight: '1.2em',
          pointerEvents: 'none',
        },
        '&[direction="right"]:before': {
          top: '50%',
          left: '120%',
          transform: 'translateY(-50%)'
        },
        '&[direction="left"]:before': {
          top: '50%',
          right: '120%',
          transform: 'translateY(-50%)'
        },
        '&[direction="top"]:before': {
          right: '50%',
          bottom: '120%',
          transform: 'translateX(50%)'
        },
        '&[direction="bottom"]:before': {
          right: '50%',
          top: '120%',
          transform: 'translateX(50%)'
        }
      }
    }
  }
};

const mapContextToProps = ({ appRef, activeView }) => ({ appRef, activeView });
export default injectSheet(styles)(withContext(mapContextToProps)(App));
