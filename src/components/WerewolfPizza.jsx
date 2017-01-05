import React from 'react';
import StateLogger from './StateLogger.jsx';
import constants from '../constants.json';

export default class WerewolfPizza extends React.Component {

  constructor (props) {
    super(props);

    let highScore = 0;
    if (!localStorage['werewolfPizza']) {
      highScore = localStorage['werewolfPizza'].highScore;
    } else {
      localStorage.setItem('werewolfPizza', JSON.stringify({ highScore: 0 }));
    }

    this.state = {
      highScore: highScore,
      score: 0,
      status: 'waiting',
      timer: constants.DEFAULT_ROUND_TICKS
    };
  }

  tick () {
    this.setState({ timer: this.state.timer - 1 });
    if (this.state.timer <= 0) {
      this.timerStop();
    }
  }

  timerStart () {
    this.setState({
      status: 'playing'
    });
    this.interval = setInterval(this.tick.bind(this), 10);
  }

  timerStop () {
    this.setState({
      status: 'finishing'
    });
    clearInterval(this.interval);
  }

  timerReset () {
    this.timerStop();
    this.setState({
      status: 'waiting',
      timer: constants.DEFAULT_ROUND_TICKS
    });
  }

  render () {
    return (
      <div>
        <StateLogger state={this.state} />
        <button disabled={this.state.status !== 'waiting'} onClick={this.timerStart.bind(this)}>Start</button>
        <button disabled={this.state.status !== 'playing'} onClick={this.timerStop.bind(this)}>Stop</button>
        <button disabled={this.state.status !== 'finishing'} onClick={this.timerReset.bind(this)}>Reset</button>
        <h1>{(this.state.timer * 0.01).toFixed(2)}</h1>
      </div>
    );
  }
}
