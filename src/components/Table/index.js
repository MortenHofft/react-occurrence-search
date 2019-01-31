import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import tableStyle from "./style";

const styles = theme => ({
  occurrenceTable: tableStyle(theme),
  icon: {
    fontSize: 14,
    color: '#aaa',
    marginLeft: 5,
    cursor: 'pointer'
  }
});

export const Th = ({children, width=300, ...rest}) => (
  <th {...rest}>
    <span style={{width: width}}>{children}</span>
  </th>
);

export const Td = ({children, width=300, ...rest}) => (
  <td {...rest}>
    <span style={{width: width}}>{children}</span>
  </td>
);

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
    const { children } = this.props;

    const scrolled = this.state.scrolled ? "scrolled" : "";
    const stickyCol = this.state.stickyCol ? "stickyCol" : "";

    return (
      <React.Fragment>
        <section className={this.props.classes.occurrenceTable}>
          <div className="tableArea">
            <table
              className={scrolled + " " + stickyCol}
              onScroll={this.bodyScroll}
              ref={this.myRef}
            >
              {children}
            </table>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default injectSheet(styles)(Table);
