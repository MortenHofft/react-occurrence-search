import React, { Component } from "react";
import withContext from "../../../appState/withContext";
import TablePresentation from './TablePresentation'

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
			loading: true, 
			error: false, 
			page: { size: 50, from: 0 },
			data: {hits: {hits: []}},
		};
  }

  loadData = () => {
    this.setState({ loading: true, error: false });
    this.props.api
      .query()
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
		console.log('next');
	}

	prev = () => {
		console.log('prev');
	}

	first = () => {
		console.log('first');
	}

  render() {
		return <TablePresentation result={this.state.data} next={this.next} prev={this.prev} first={this.first} size={this.state.page.size} from={this.state.page.from} />;
  }
}

const mapContextToProps = ({ api }) => ({ api });
export default withContext(mapContextToProps)(Table);
