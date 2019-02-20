import React, { Component } from 'react';
import Table, { Th, Td } from '../../Table';
import Action from '../../Action';
import formatters from '../../../util/formatters';

// TODO needs a loader and possibly an error handler (unless that belongs with the logic component as a general handler?)
class TablePresentation extends Component {
  // shouldComponentUpdate(nextProps) {
  // 	return !equal(nextProps.result, props.result);
  // }
  state = {fixedColumn: true};

  getRows = () => {
    const { result } = this.props;
    const hits = result.hits.hits;
    const rows = hits.map(row => {
      const cells = ['gbifScientificName', 'year', 'basisOfRecord', 'datasetTitle', 'publisherTitle', 'countryCode', 'gbifTaxonRank'].map(
        (field, i) => {
          const FormatedName = formatters(field).component;
          const Presentation = <FormatedName id={row._source[field]} />;
          if (i === 0) return <Td key={field}><Action onSelect={() => console.log(row._id)}>{Presentation}</Action></Td>;
          else return <Td key={field}>{Presentation}</Td>;
        }
      );
      return <tr key={row._id}>{cells}</tr>;
    });
    return rows;
  }

  render() {
    const { result, first, prev, next, size, from } = this.props;
    const total = result.hits.total;

    // config: {headers: [{title, width, field}], rows: []} - hmma bit unclear how to do that well.
    const headers = [
      <Th key='scientificName' width='wide' locked={this.state.fixedColumn} toggle={e => { this.setState({ fixedColumn: !this.state.fixedColumn }) }}>
        scientificName
      </Th>,
      <Th key='year'>
        year
      </Th>,
      <Th key='basisOfRecord' width='wide'>
        basisOfRecord
      </Th>,
      <Th key='datasetTitle' width='wide'>
        datasetTitle
      </Th>,
      <Th key='publisherTitle' width='wide'>
        publisherTitle
      </Th>,
      <Th key='countryCode'>
        countryCode
      </Th>,
      <Th key='gbifTaxonRank'>
        rank
      </Th>
    ];

    const table = (
      <Table fixedColumn={this.state.fixedColumn} {...{ first, prev, next, size, from, total }}>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>
          {this.getRows()}
        </tbody>
      </Table>
    );

    return <React.Fragment>{table}</React.Fragment>;
  }
}

export default TablePresentation;
