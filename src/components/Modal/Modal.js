import ReactDOM from "react-dom";
import React from "react";
import withContext from '../../appState/withContext';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    document.body.appendChild(this.el);
  }

  componentDidMount() {
    if (this.props.appRef.current) {
      this.mounted = true;
      this.props.appRef.current.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    // if (this.props.appRef.current && this.mounted) {
    if (this.mounted) {
      this.props.appRef.current.removeChild(this.el);
      document.body.removeChild(this.el);
      this.mounted = false;
    }
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

const mapContextToProps = ({ appRef }) => ({ appRef });
export default withContext(mapContextToProps)(Modal);

