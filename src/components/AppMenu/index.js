import React, { Component } from "react";
import injectSheet from "react-jss";
import { FormattedMessage } from '../../util/intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import Action from '../Action';
import withContext from '../../appState/withContext';

class AppMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuId: 'menu_' + Math.random()
    };
  }

  render() {
    const { classes } = this.props;
    const element = (
      <ul className={classes.selector}>
        <li className={this.props.activeView === 'TABLE' ? classes.activeItem : classes.item}>
          <Action className={classes.innerItem} onSelect={() => { this.props.updateView('TABLE') }}><FormattedMessage id="appMenu.table" /></Action>
        </li>
        <li className={this.props.activeView === 'GALLERY' ? classes.activeItem : classes.item}>
          <Action className={classes.innerItem} onSelect={() => { this.props.updateView('GALLERY') }}><FormattedMessage id="appMenu.gallery" /></Action>
        </li>
        <li className={this.props.activeView === 'MAP' ? classes.activeItem : classes.item}>
          <Action className={classes.innerItem} onSelect={() => { this.props.updateView('MAP') }}><FormattedMessage id="appMenu.map" /></Action>
        </li>
        <li className={classes.menuToggle}>
          <Action className={classes.innerItem}><FontAwesomeIcon icon={faEllipsisV} /></Action>
        </li>
      </ul>
    );
    return element;
  }
}

const styles = theme => {
  const item = {
    display: 'inline-block',
    textAlign: 'center',
    textDecoration: 'none',
    color: 'inherit',
    display: 'inline-block',
    flex: '1 1 30%',
    display: 'table',
    height: '33px',
  }

  return {
    selector: {
      display: "inline-block",
      margin: 0,
      right: 420,
      top: 20,
      listStyle: "none",
      background: "#fff",
      padding: 0,
      border: "1px solid #ddd",
      borderRadius: 3,
      fontSize: 12,
      width: '100%',
      display: 'flex',
    },
    innerItem: {
      display: 'table-cell',
      verticalAlign: 'middle'
    },
    item: item,
    activeItem: {
      ...item,
      background: theme.primaryColor,
      color: "#fff"
    },
    menuToggle: {
      ...item,
      flex: '0 0 33px',
      borderLeft: '1px solid #ddd'
    }
  }
};

// let hocWidget = props => (
//   <StateContext.Consumer>
//     {({ appSettings, showWidgets, openMenu, api }) => {
//       return <ViewSelector {...props} api={api} showWidgets={showWidgets} openMenu={openMenu} appSettings={appSettings} />;
//     }}
//   </StateContext.Consumer>
// );

const mapContextToProps = ({ activeView, api }) => ({ activeView, updateView: api.updateView });
export default injectSheet(styles)(withContext(mapContextToProps)(AppMenu));