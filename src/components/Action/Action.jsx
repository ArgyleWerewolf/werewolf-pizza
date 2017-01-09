import { label } from '../../utils.js';
import React from 'react';

require('./Action.scss');

export default class Action extends React.Component {

  onClick () {
    this.props.callback(this.props.action);
  }

  render () {

    if (this.props.gameStatus === 'waiting') {
      return null;
    }

    const classes = 'action action--' + this.props.index;
    const actionLabel = (this.props.action === 'shoot') ? label('ACTION_SHOOT') : label('ACTION_PAY');

    return (
      <div className={classes}>
        <button
          disabled={this.props.gameStatus === 'finishing'}
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
  gameStatus: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired
};
