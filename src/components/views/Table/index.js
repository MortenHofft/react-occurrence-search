import React, { Component } from "react";
import withContext from "../../../appState/withContext";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
			loading: true, 
			error: false, 
			size: 20,
			from: 20,
			data: {hits: {hits: []}},
		};
  }

  loadData = () => {
    this.setState({ loading: true, error: false });
    this.props.api
      .query(this.props.filter, this.state.size, this.state.from)
      .then(response => {
        if (this._isMount) {
					this.setState({ loading: false, error: false, data: response.data });
				}
      })
      .catch(err => {
				if (this._isMount) {
					this.setState({ loading: false, error: true });
				}
			});
  };

  componentDidMount() {
    this._isMount = true;
    this.loadData();
	}
	
	next = () => {
		this.setState({from: Math.max(0, this.state.from + this.state.size)}, this.loadData);
	}

	prev = () => {
		this.setState({from: Math.max(0, this.state.from - this.state.size)}, this.loadData);
	}

	first = () => {
		this.setState({from: 0}, this.loadData);
	}

  render() {
		const TableView = this.props.components.TableView
		return <TableView loading={this.state.loading} result={this.state.data} next={this.next} prev={this.prev} first={this.first} size={this.state.size} from={this.state.from} />
  }
}

const mapContextToProps = ({ filter, api, components }) => ({ filter, api, components });
export default withContext(mapContextToProps)(Table);
