import ReactDOM from "react-dom";
import React from "react";
import withContext from '../../appState/withContext';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    if (this.props.appRef.current) this.props.appRef.current.appendChild(this.el);
  }

  componentWillUnmount() {
    if (this.props.appRef.current) this.props.appRef.current.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

const mapContextToProps = ({ appRef }) => ({ appRef });
export default withContext(mapContextToProps)(Modal);

