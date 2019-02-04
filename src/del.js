import React, { Component } from "react";
import { ThemeProvider } from "react-jss";

import Table, { Th, Td } from "./components/Table";

//root element
/*
build theme and build config.
Root.js
<theme>
  <App settings>

App.js - create context and hold it
<Context>
  <Layout>
    dfg
*/
const theme = {
  primary: "tomato",
};

document.body.addEventListener('mousedown', function() {
  document.body.classList.add('using-mouse');
});
document.body.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    document.body.classList.remove('using-mouse');
  }
});

export default class extends Component {
  render() {
    const headers = [];
    "19283761298376"
      .split("")
      .forEach((x, i) => headers.push(<Th key={i} width="wide" toggle={i===0}>header columns {x}</Th>));

    const cells = [<td key="sdf">Phellodon P.Karst.</td>];
    "1928376129837"
      .split("")
      .forEach((x, i) =>
        cells.push(
          <Td key={i + "_"}>
            Phellodon P.Karst. 
          </Td>
        )
      );

    const row = <tr>{cells}</tr>;
    return (
      <div>
        <ThemeProvider theme={theme}>
          <div style={{ display: "flex", width: "500px", height: "600px", flexDirection: 'column' }}>
            <div style={{ flex: "1 1 auto%", height: '75%', background: "yellow" }}>
              <Table fixedColumn>
                <thead>
                  <tr>{headers}</tr>
                </thead>
                <tbody>
                  {row}
                  {row}
                  {row}
                  {row}
                  {row}
                  {row}
                  {row}
                  {row}
                  {row}
                  {row}
                  {row}
                  {row}
                  {row}
                  {row}
                  {row}
                  {row}
                  {row}
                  {row}
                  {row}
                  {row}
                  {row}
                </tbody>
              </Table>
            </div>
          </div>
        </ThemeProvider>
      </div>
    );
  }
}
