import ActionButton from './ActionButton.jsx';
import constants from '../constants.json';
import React from 'react';
import StateLogger from './StateLogger.jsx';

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
      actions: null,
      highScore: highScore,
      score: 0,
      status: 'waiting',
      timer: constants.DEFAULT_ROUND_TICKS,
      visitor: null
    };
  }

  actionClicked (action) {
    console.log(action);
  }

  getVisitor () {
    return Math.random() < 0.5 ? 'werewolf' : 'pizza';
  }

  roundReset () {
    clearInterval(this.interval);
    this.setState({
      actions: null,
      status: 'waiting',
      timer: constants.DEFAULT_ROUND_TICKS,
      visitor: null
    });
  }

  roundStart () {
    this.setState({
      actions: constants.ACTIONS,
      status: 'playing',
      visitor: this.getVisitor()
    });
    this.timerStart();
  }

  roundStop () {
    this.timerStop();
    this.setState({
      status: 'finishing'
    });
  }

  roundTimeOut () {
    this.roundStop();
    this.setState({
      score: this.state.score - 1
    });
  }

  tick () {
    this.setState({ timer: this.state.timer - 1 });
    if (this.state.timer <= 0) {
      this.roundTimeOut();
    }
  }

  timerStart () {
    this.interval = setInterval(this.tick.bind(this), 10);
  }

  timerStop () {
    clearInterval(this.interval);
  }

  render () {

    let actions = null;

    if (this.state.status !== 'waiting') {
      const that = this;
      actions = this.state.actions.map(function (act) {
        return (
          <ActionButton
            action={act}
            callback={that.actionClicked}
            key={act}
          />
        );
      });

    }

    return (
      <div>
        <StateLogger state={this.state} />

        <button disabled={this.state.status !== 'waiting'} onClick={this.roundStart.bind(this)}>Start</button>

        <br /><br />

        {actions}

        <br /><br />

        <button disabled={this.state.status !== 'finishing'} onClick={this.roundReset.bind(this)}>Reset</button>

        <h1>{(this.state.timer * 0.01).toFixed(2)}</h1>
      </div>
    );
  }
}
