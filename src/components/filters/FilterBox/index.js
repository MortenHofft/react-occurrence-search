import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faAngleDoubleLeft, faAngleLeft, faAngleRight, faEllipsisV, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { injectIntl } from 'react-intl';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import Action from '../../Action';

const styles = theme => {
  return {
  }
};

class FilterBox extends Component {
  render() {
    const { classes, children, title, apply, isDifferentFromFilter } = this.props;
    return (
      <React.Fragment>
        <div className={classes.wrapper}>
          <h2>{title}</h2>
          <div>
            {children}
          </div>
          <button>Cancel</button>
          {isDifferentFromFilter && <button type="submit" onClick={() => apply()}>Apply</button>}
        </div>
      </React.Fragment>
    );
  }
}

export default injectSheet(styles)(injectIntl(FilterBox));
