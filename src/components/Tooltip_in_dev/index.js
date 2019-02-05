import React, { Component } from "react";
import injectSheet from "react-jss";

class Tooltip extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayTooltip: false
    }
    this.hideTooltip = this.hideTooltip.bind(this)
    this.showTooltip = this.showTooltip.bind(this)
  }

  hideTooltip() {
    this.setState({ displayTooltip: false })

  }
  showTooltip() {
    this.setState({ displayTooltip: true })
  }

  render() {
    const { classes } = this.props;
    let message = this.props.message
    let position = this.props.position
    return (
      <span className={classes.tooltip}
        onMouseLeave={this.hideTooltip}
      >
        {this.state.displayTooltip &&
          <div className={`${classes.tooltipBubble} ${classes.tooltipTop}`}>
            <div className={classes.tooltipMessage}>{message}</div>
          </div>
        }
        <span
          className={classes.tooltipTrigger}
          onMouseOver={this.showTooltip}
        >
          {this.props.children}
        </span>
      </span>
    )
  }
}

const tooltipColor = '#444';
const tooltipTextColor = '#fff';

const styles = {
  tooltip: {
    position: 'relative'
  },
  tooltipTrigger: {
    display: 'inline-block',
    textDecoration: 'underline',
  },
  tooltipBubble: {
    minWidth: 120,
    maxWidth: 210,
    position: 'absolute',
    zIndex: 10,
    pointerEvents: 'none',
    '&:after': {
      content: '""',
      position: 'absolute',
    }
  },
  tooltipTop: {
    bottom: '100%',
    left: '50%',
    paddingBottom: 9,
    transform: 'translateX(-50%)',
    '&:after': {
      borderLeft: '9px solid transparent',
      borderRight: '9px solid transparent',
      borderTop: `9px solid ${tooltipColor}`,
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
    }
  },
  // .tooltip-bottom {
  //   top: 100%;
  //   left: 50%;
  //   padding-top: 9px;
  //   transform: translateX(-50%);

  //   &::after {
  //     border-left: 9px solid transparent;
  //     border-right: 9px solid transparent;
  //     border-bottom: 9px solid $tooltip-color;
  //     top: 0;
  //     left: 50%;
  //     transform: translateX(-50%);
  //   }
  // }

  // .tooltip-left {
  //   top: 50%;
  //   right: 100%;
  //   padding-right: 9px;
  //   transform: translateY(-50%);

  //   &::after {
  //     border-left: 9px solid $tooltip-color;
  //     border-top: 9px solid transparent;
  //     border-bottom: 9px solid transparent;
  //     top: 50%;
  //     right: 0;
  //     transform: translateY(-50%);
  //   }
  // }

  // .tooltip-right {
  //   top: 50%;
  //   left: 100%;
  //   padding-left: 9px;
  //   transform: translateY(-50%);

  //   &::after {
  //     border-right: 9px solid $tooltip-color;
  //     border-top: 9px solid transparent;
  //     border-bottom: 9px solid transparent;
  //     top: 50%;
  //     left: 0;
  //     transform: translateY(-50%);
  //   }
  // }
  tooltipMessage: {
    background: tooltipColor,
    borderRadius: 3,
    color: tooltipTextColor,
    fontSize: '.75rem',
    lineHeight: 1.4,
    padding: '.75em',
    textAlign: 'center',
    pointerEvents: 'none',
  }
}

export default injectSheet(styles)(Tooltip);