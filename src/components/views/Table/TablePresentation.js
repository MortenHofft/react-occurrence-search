import React, { Component } from "react";
import Table, { Th, Td } from "../../Table";

class TablePresentation extends Component {
  // shouldComponentUpdate(nextProps) {
  // 	return !equal(nextProps.result, props.result);
  // }

  render() {
    const { result, first, prev, next, size, from } = this.props;
		const total = result.hits.total;

    // config: {headers: [{title, width, field}], rows: []} - hmma bit unclear how to do that well.
    const headers = [
      <Th key="scientificName" width="wide" toggle={true}>
        scientificName
      </Th>,
      <Th key="basisOfRecord" width="wide">
        basisOfRecord
      </Th>,
      <Th key="datasetTitle" width="wide">
        datasetTitle
      </Th>
    ];

    const hits = result.hits.hits;
    const rows = hits.map(row => {
      const cells = ["scientificName", "basisOfRecord", "datasetTitle"].map(
        field => {
          return <Td key={field}>{row._source[field]}</Td>;
        }
      );
      return <tr key={row._id}>{cells}</tr>;
    });

    const table = (
      <Table fixedColumn {...{ first, prev, next, size, from, total }}>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );

    return <React.Fragment>{table}</React.Fragment>;
  }
}

export default TablePresentation;
