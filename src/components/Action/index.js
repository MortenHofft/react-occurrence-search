import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  button: {
    cursor: 'pointer'
  }
}
const Action = ({children, classes, className, ...rest}) => <span className={`${classes.button} ${className}`} {...rest} role="button" tabIndex="0">
  {children}
</span>

export default injectSheet(styles)(Action);
