import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faAngleDoubleLeft, faAngleLeft, faAngleRight, faEllipsisV, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { injectIntl } from 'react-intl';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import Action from '../Action';

const cell = {
  display: 'block',
  wordBreak: 'break-word'
};

const styles = theme => {
  const borderRadius = '5px';
  const footerItem = {
    flex: '0 0 auto',
    padding: '0 10px',
    height: 30,
    lineHeight: '30px',
    marginTop: 10,
    width: 30,
    padding: 0,
    textAlign: 'center',
    border: '1px solid transparent'
  }

  return {
    wrapper: {
      border: '1px solid #e5ebed',
      borderRadius: borderRadius,
      height: '100%'
    },
    occurrenceTable: {
      width: '100%', // layout
      height: 'calc(100% - 50px)', // layout
      overflow: 'auto', // layout
      position: 'relative', // layout
      background: 'white',
      borderRadius: `${borderRadius} ${borderRadius} 0 0`
    },
    footer: {
      height: 50, // layout
      display: 'flex',
      flexDirection: 'row',
      padding: '0 10px',
      background: '#f7f9fa',
      borderRadius: `0 0 ${borderRadius} ${borderRadius}`
    },
    footerItem: {
      ...footerItem,
      '&:hover': {
        borderColor: '#eaeaea',
      },
      '&:active': {
        background: '#f0f2f3'
      }
    },
    footerText: {
      ...footerItem,
      width: 'auto',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    footerItemFiller: {
      flex: '1 1 auto'
    },
    table: {
      position: 'relative', // layout
      minWidth: '100%',
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
        padding: '8px 12px'
      },
      '& td': {
        padding: 12
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
  }
};

export const Th = injectSheet(styles)(({ children, width, toggle, locked, classes, theme, ...rest }) => (
  <th className={classes.th} {...rest}>
    <span className={classes[width] ? `wide ${classes[width]}` : ''}>{children} {toggle && <Action onSelect={toggle}><FontAwesomeIcon icon={locked ? faLock : faLockOpen} /> </Action>}</span>
  </th>
));

export const Td = injectSheet(styles)(({ children, width, classes, theme, ...rest }) => (
  <td className={classes.td}  {...rest}>
    <span className={classes[width] ? classes[width] : ''}>{children}</span>
  </td>
));

class Table extends Component {
  constructor(props) {
    super(props);

    this.bodyScroll = this.bodyScroll.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.myRef = React.createRef();
    this.state = {};
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
    const { children, classes, intl, first, prev, next, size, from, total } = this.props;

    const scrolled = this.state.scrolled ? `scrolled ${classes.scrolled}` : '';
    const stickyCol = this.props.fixedColumn ? `stickyColumn ${classes.stickyColumn}` : '';

    const page = 1 + Math.floor(from/size);
    const totalPages = Math.ceil(total/size);

    return (
      <React.Fragment>
        <div className={classes.wrapper}>
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
          <div className={classes.footer}>
            {page > 2 && <Action className={'tooltip ' + classes.footerItem} direction="right" tip={intl.formatMessage({ id: 'first' })} onSelect={first}>
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </Action>}
            {page > 1 && <Action className={'tooltip ' + classes.footerItem} direction="right" tip={intl.formatMessage({ id: 'previous' })} onSelect={prev}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </Action>}
            <span className={classes.footerItemFiller}></span>
            <span className={classes.footerText}>
              <FormattedMessage
                id='pagination.pageXofY'
                defaultMessage={'Loading'}
                values={{ current: <FormattedNumber value={page}/>, total: <FormattedNumber value={totalPages}/> }}
              />
            </span>
            <span className={classes.footerItemFiller}></span>
            {page !== totalPages && <Action className={'tooltip ' + classes.footerItem} direction="left" tip={intl.formatMessage({ id: 'next' })} onSelect={next}>
              <FontAwesomeIcon icon={faAngleRight} />
            </Action>}
            <Action className={'tooltip ' + classes.footerItem} direction="left" tip={intl.formatMessage({ id: 'options' })}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </Action>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default injectSheet(styles)(injectIntl(Table));
