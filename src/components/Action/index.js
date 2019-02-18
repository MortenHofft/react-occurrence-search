import React from 'react';
import injectSheet from 'react-jss';
const KEY_SPACE = 32;
const KEY_ENTER = 13;

const styles = {
  button: {
    cursor: 'pointer',
  }
}
const keypressHandler = (event, cb) => {
  if (event.which === KEY_SPACE || event.which === KEY_ENTER) {
    event.stopPropagation;
    return cb();
  }
  return true;
}
const Action = ({ children, onSelect = () => {}, classes, className, ...rest }) => <span onClick={() => onSelect()} onKeyPress={e => keypressHandler(e, onSelect)} className={`${classes.button} ${className ? className : ''}`} {...rest} role="button" tabIndex="0">
  {children}
</span>

export default injectSheet(styles)(Action);
