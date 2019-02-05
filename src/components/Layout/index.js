import React, { Component } from "react";
import injectSheet from "react-jss";
import withContext from "../../appState/withContext";

// import Count from "../count/Count";

class Layout extends Component {
  render() {
    const { classes } = this.props;
    let mainContent = this.props.table;
    if (this.props.activeView === "MAP") {
      mainContent = this.props.map;
    } else if (this.props.activeView === "GALLERY") {
      mainContent = this.props.gallery;
    }
    return (
      <div className={classes.layout}>
        <div className={classes.search}>
          <div className={classes.searchBar}>
            {this.props.quickSearch}
          </div>
          <div className={classes.viewNav}>
            {this.props.appMenu}
          </div>
        </div>
        {/* <div className={classes.summary}>
          {this.props.filterSummary}
        </div> */}
        <div className={classes.body}>
          <div className={classes.main}>
            {mainContent}
          </div>
          {this.props.showWidgets && <div className={classes.secondary}>
            {this.props.widgetDrawer}
          </div>}
        </div>
        <div className={classes.footer}>
          <div className={classes.footerContent}>
            {/* <Count filter={filter} /> occurrences */}Number of occurrences
          </div>
        </div>
      </div>
    );
  }
}

const styles = theme => {
  return {
    layout: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      overflow: "auto",
    },
    search: {
      flex: "0 0 auto",
      flexDirection: "row",
      display: 'flex',
    },
    body: {
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: "row",
      overflow: 'hidden'
    },
    footer: {
      flex: "0 0 auto",
    },
    footerContent: {
      padding: '5px 12px',
      background: '#444',
      color: 'white',
      fontSize: `${Math.round(theme.fontSizePx*0.85)}px`,
      fontWeight: '700'
    },
    searchBar: {
      flex: "1 1 auto",
      margin: "10px 10px 0 10px"
    },
    viewNav: {
      flex: '0 0 300px',
      margin: "10px 10px 0 0"
    },
    main: {
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: "column",
      overflow: 'hidden',
      margin: 10,
    },
    summary: {
      flex: "0 0 auto",
      margin: "0 10px"
    },
    secondary: {
      width: 300,
      margin: "10px 10px 10px 0",
      flex: '0 0 auto',
      overflow: 'auto'
    }
  }
};

// let hocLayout = props => (
//   <StateContext.Consumer>
//     {({ showWidgets, api, filter }) => {
//       return <Layout {...props} filter={filter} api={api} showWidgets={showWidgets} /> 
//     }}
//   </StateContext.Consumer>
// );

const mapContextToProps = ({ }) => ({});
export default injectSheet(styles)(withContext(mapContextToProps)(Layout));
