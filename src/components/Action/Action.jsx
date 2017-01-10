import { label } from '../../utils.js';
import React from 'react';

require('./Action.scss');

export default class Action extends React.Component {

  onClick () {
    this.props.callback(this.props.action);
  }

  render () {

    if (this.props.roundStatus === 'waiting') {
      return null;
    }

    const classes = 'action action--' + this.props.index;
    const actionLabel = (this.props.action === 'shoot') ? label('ACTION_SHOOT') : label('ACTION_PAY');

    return (
      <div className="action-container">
        <button
          className={classes}
          disabled={this.props.roundStatus === 'finishing'}
          onClick={this.onClick.bind(this)}
        >
          {actionLabel}
        </button>
      </div>
    );
  }
}

Action.propTypes = {
  action: React.PropTypes.string.isRequired,
  callback: React.PropTypes.func.isRequired,
  index: React.PropTypes.number.isRequired,
  roundStatus: React.PropTypes.string.isRequired
};
