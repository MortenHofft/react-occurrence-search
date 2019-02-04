import React from 'react';

export default ({children , ...rest}) => <span {...rest} role="button" tabIndex="0">
  {children}
</span>