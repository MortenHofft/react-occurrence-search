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

class EnumFilterSimplePresentation extends Component {
  render() {
    const { classes, options, toggle, isDifferentFromFilter } = this.props;

    const ops = options.map(x => (
      <div key={x.name}>
        <label>
          <input type="checkbox" checked={x.selected} onChange={() => toggle(x.name)}></input>
          {x.name} - {x.inFilter ? 'true' : 'false'}
        </label>
      </div>
    ));
    return (
      <React.Fragment>
        <div className={classes.wrapper}>
          <div>
            {ops}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default injectSheet(styles)(injectIntl(EnumFilterSimplePresentation));
