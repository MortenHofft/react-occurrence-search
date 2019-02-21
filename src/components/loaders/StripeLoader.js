import React from 'react';
import injectSheet from 'react-jss';

const loader = {
  height: 1,
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
};
const loadbarBefore = {
  display: 'block',
  position: 'absolute',
  content: '""',
  left: -200,
  width: 200,
  height: 1,
  backgroundColor: '#2980b9',
  animation: 'loading 1.5s linear infinite'
}

const styles = theme => {
  return {
    loader: {
      ...loader,
      '&:before': {
        ...loadbarBefore
      }
    },
    loaderError: {
      ...loader,
      '&:before': {
        ...loadbarBefore,
        backgroundColor: 'tomato',
        left: 0,
        animation: 'none',
        width: '100%'
      }
    },
    loaderInactive: {
      ...loader
    },
    '@keyframes loading': {
      from: {
        left: -200,
        width: '30%'
      },
      '50%': {
        width: '30%'
      },
      '70%': {
        width: '70%'
      },
      '80%': {
        left: '50%'
      },
      '95%': {
        left: '120%'
      },
      to: {
        left: '100%'
      }
    }
  }
};

function StripeLoader(props) {
  const { classes } = props;
  const loaderClass = props.error ? classes.loaderError : classes.loader;
  return (
    <div className={props.active ? loaderClass : classes.loaderInactive}>sdf</div>
  );
}

export default injectSheet(styles)(StripeLoader);