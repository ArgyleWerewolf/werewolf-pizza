import React from 'react';

require('./Timer.scss');

export default class Timer extends React.Component {

  render () {
    if (this.props.roundStatus === 'waiting') {
      return <div className="timer" />;
    }
    return <div className="timer">{(this.props.timer * 0.01).toFixed(2)}</div>;
  }
}

Timer.propTypes = {
  roundStatus: React.PropTypes.string.isRequired,
  timer: React.PropTypes.number.isRequired
};
