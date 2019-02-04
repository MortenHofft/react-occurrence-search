import React, { Component } from 'react';
import injectSheet from 'react-jss';
import {
  FormattedRelative,
  FormattedMessage
} from 'react-intl';

import Table, { Th, Td } from "./Table";

const styles = theme => ({
  mouseUser: {
    outline: 'none' // We will only show outlines if it is a keyboard user. Else all those blue outlines is a bit much.
  },
  app: {
    position: 'relative',
    background: '#f2f6f9',
    height: '100%',
    color: theme.primary,//'#2e3c43',
    fontSize: '14px',
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
        margin: 7,
        position: 'absolute',
        whiteSpace: 'nowrap',
        zIndex: 25,
        lineHeight: '1.2em',
        right: '120%',
        pointerEvents: 'none',
      },
      '&[direction="right"]:before': {
        left: '120%',
        right: 'auto',
      },
    }
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    const { classes } = props;

    this.myRef = React.createRef();

    // Add styling clues
    // We will only show outlines if it is a keyboard user. Else all those blue outlines is a bit much.
    document.body.addEventListener('mousedown', () => {
      this.myRef.current.classList.add(classes.mouseUser);
    });
    document.body.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        this.myRef.current.classList.remove(classes.mouseUser);
      }
    });
  }

  render() {
    const { classes } = this.props;


    const headers = [];
    "19283761298376"
      .split("")
      .forEach((x, i) => headers.push(<Th key={i} width="wide" toggle={i===0}>header columns {x}</Th>));

    const cells = [<td key="sdf">Phellodon P.Karst.</td>];
    "1928376129837"
      .split("")
      .forEach((x, i) =>
        cells.push(
          <Td key={i + "_"}>
            Phellodon P.Karst. 
          </Td>
        )
      );

    const row = <tr>{cells}</tr>;

    return (
      <div ref={this.myRef} className={classes.app}>
        <div style={{ flex: "1 1 auto%", height: '75%' }}>
          <Table fixedColumn>
            <thead>
              <tr>{headers}</tr>
            </thead>
            <tbody>
              {row}
              {row}
              {row}
              {row}
              {row}
              {row}
            </tbody>
          </Table>
        </div>
        
      </div>
    );
  }
}

export default injectSheet(styles)(App);
