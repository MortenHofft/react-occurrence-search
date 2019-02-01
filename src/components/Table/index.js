import React, { Component } from 'react';
import _ from 'lodash';
import injectSheet from 'react-jss';

const cell = {
  margin: '0 10px',
  display: 'block',
  wordBreak: 'break-word'
};

const styles = theme => ({
  occurrenceTable: {
    width: '100%', // layout
    height: '100%', // layout
    overflow: 'scroll', // layout
    position: 'relative', // layout
    background: 'white',
    border: '1px solid #e5ebed',
    borderRadius: 5
  },
  table: {
    position: 'relative', // layout
    borderCollapse: 'separate',
    background: 'white',
    borderSpacing: 0,
    fontSize: 12,
    '& th, td': {
      borderRight: '1px solid #e5ebed',
      transition: 'background-color 200ms ease',
      borderBottom: '1px solid #e5ebed',
      textAlign: 'left',
    },
    '& thead th': {
      position: 'sticky', // layout
      top: 0, // layout
      borderBottomWidth: '2px',
      background: '#f7f9fa',
      color: '#8091a5',
    },
    '& td': {
      paddingTop: 16,
      paddingBottom: 16,
    },
    '& tbody>tr>td:first-child': {
      borderRight: '1px solid #e5ebed',
      background: 'white'
    }
  },
  stickyColumn: {
    '& thead th:first-child': {
      left: 0, // layout - sticky col
      zIndex: 1 // layout
    },
    '& tbody>tr>td:first-child': {
      position: 'sticky', // layout - sticky col
      left: 0, // layout - sticky col
    }
  },
  scrolled: {
    '& td': {
      backgroundColor: '#fbfbfb'
    },
    '& thead th': {
      background: '#f1f3f5'
    },
    '& thead th:first-of-type': {
      background: '#f7f9fa',
    }
  },
  wide: {
    width: '20em',
    ...cell
  },
});

export const Th = injectSheet(styles)(({ children, width, classes, theme, ...rest }) => (
  <th className={classes.th} {...rest}>
    <span className={classes[width] ? `wide ${classes[width]}` : null}>{children}</span>
  </th>
));

export const Td = injectSheet(styles)(({ children, width, classes, theme, ...rest }) => (
  <td className={classes.td}  {...rest}>
    <span className={classes[width] ? classes[width] : null}>{children}</span>
  </td>
));

class Table extends Component {
  constructor(props) {
    super(props);

    this.bodyScroll = this.bodyScroll.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.myRef = React.createRef();

    this.state = {
      stickyCol: true
    };
  }

  bodyScroll() {
    this.setState({ scrolled: this.myRef.current.scrollLeft !== 0 });
  }

  handleShow(field) {
    this.setState({ showModalFilter: true, modalField: field });
  }

  handleHide() {
    this.setState({ showModalFilter: false });
  }

  render() {
    const { children, classes } = this.props;

    const scrolled = this.state.scrolled ? `scrolled ${classes.scrolled}` : '';
    const stickyCol = this.state.stickyCol ? `stickyColumn ${classes.stickyColumn}` : '';

    return (
      <React.Fragment>
        <div
          className={`occurrenceTable ${classes.occurrenceTable}`}
          onScroll={this.bodyScroll}
          ref={this.myRef}
        >
          <table
            className={`${classes.table} ${scrolled} ${stickyCol}`}
          >
            {children}
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default injectSheet(styles)(Table);
