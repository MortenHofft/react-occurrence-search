import React, { Component } from 'react'
import { ThemeProvider } from 'react-jss';
import Table, { Th, Td } from './components/Table';

const theme = {
  primary: 'tomato'
}

export default class extends Component {

  render() {
    const headers = [];
    '19283761298376'.split('').forEach((x, i) => headers.push(<Th key={i}>header columns {x}</Th>));

    const cells = [];
    '19283761298376'.split('').forEach((x, i) => cells.push(<Td key={i + '_'} >{Math.random()} sdflgjk ksjdf glksjdfæglkjsdf ælgkjsædflkgj sdlækfgj </Td>));

    const row = <tr>{cells}</tr>
    return <div>
      <ThemeProvider theme={theme}>
        <div style={{width: '1200px', height: '500px'}}>
          <Table>
            <thead>
              <tr>
                {headers}
              </tr>
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
            </tbody>
          </Table>
        </div>
      </ThemeProvider>
    </div>
  }
}
