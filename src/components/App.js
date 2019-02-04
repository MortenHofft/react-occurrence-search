import React, { Component } from "react";
import injectSheet from 'react-jss';

//root element
/*
build theme and build config.
App.js - create context and hold it
<Context>
  <Layout>
    dfg
*/

const styles = theme => (
  {
    mouseUser: {
      outline: 'none' // We will only show outlines if it is a keyboard user. Else all those blue outlines is a bit much.
    }
  }
);


class App extends Component {
  constructor(props) {
    super(props);
    const { classes } = props;

    this.myRef = React.createRef();

    // Add styling clues
    // We will only show outlines if it is a keyboard user. Else all those blue outlines is a bit much.
    document.body.addEventListener('mousedown', () => {
      this.myRef.current.classList.add(classes.mouseUser);
    });
    document.body.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        this.myRef.current.classList.remove(classes.mouseUser);
      }
    });
  }

  render() {
    return (
        <div ref={this.myRef}>sdf</div>
    );
  }
}


export default injectSheet(styles)(App);