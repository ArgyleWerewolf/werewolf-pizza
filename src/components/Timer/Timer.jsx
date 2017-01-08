import React from 'react';

require('./Timer.scss');

export default class Timer extends React.Component {

  render () {
    if (this.props.gameStatus === 'waiting') {
      return null;
    }
    return <h3>{(this.props.timer * 0.01).toFixed(2)}</h3>;
  }
}

Timer.propTypes = {
  gameStatus: React.PropTypes.string.isRequired,
  timer: React.PropTypes.number.isRequired
};
