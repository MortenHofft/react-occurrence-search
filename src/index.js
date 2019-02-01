import React, { Component } from "react";
import { ThemeProvider } from "react-jss";
import Table, { Th, Td } from "./components/Table";

const theme = {
  primary: "tomato"
};

export default class extends Component {
  render() {
    const headers = [];
    "19283761298376"
      .split("")
      .forEach((x, i) => headers.push(<Th key={i} width="wide">header columns {x}</Th>));

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
          <div style={{ display: "flex", width: "700px", height: "700px", flexDirection: 'column' }}>
            <div style={{ flex: "1 1 auto%", height: '75%', background: "yellow" }}>
              <Table>
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
