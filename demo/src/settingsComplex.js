const settings = {
  components: {
    TableView: props => {
      const { result } = props;
      const hits = result.hits.hits;
      const rows = hits.map(row => {
        const cells = ['gbifScientificName', 'year'].map(
          (field, i) => <td key={field}>{ row._source[field] }</td>
        );
        return <tr key={row._id}>{cells}</tr>;
      });
      return <table className="table table-striped">
        <thead>
          <tr>
            <th>Scientific name</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>
    }
  }
}

export default settings;