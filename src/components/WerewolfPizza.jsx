import { reverse } from 'lodash';
import ActionButton from './ActionButton.jsx';
import { ACTIONS, ROUND_TICKS, STORAGE_KEY } from '../constants.json';
import React from 'react';
import StateLogger from './StateLogger.jsx';

export default class WerewolfPizza extends React.Component {

  constructor (props) {
    super(props);

    this.storageInitialize();

    this.state = {
      actions: null,
      highScore: this.storageRead('highScore'),
      score: 0,
      status: 'waiting',
      timer: ROUND_TICKS,
      visitor: null
    };
  }

  actionClicked (action) {
    this.roundStop();
    if (
      (action === 'shoot' && this.state.visitor === 'werewolf') ||
      (action === 'pay' && this.state.visitor === 'pizza')
    ) {
      this.handleWin();
    } else {
      this.handleLose();
    }
  }

  getActions () {
    return Math.random() < 0.5 ? ACTIONS : reverse(ACTIONS);
  }

  getVisitor () {
    return Math.random() < 0.5 ? 'werewolf' : 'pizza';
  }

  handleLose () {
    this.setState({
      score: 0
    });
  }

  handleWin () {
    const updatedScore = this.state.score + 1;
    const updatedHighScore = (updatedScore > this.state.highScore) ? updatedScore : this.state.highScore;
    this.setState({
      highScore: updatedHighScore,
      score: updatedScore
    });
    this.storageWrite('highScore', updatedHighScore);
  }

  roundReset () {
    clearInterval(this.interval);
    this.setState({
      actions: null,
      status: 'waiting',
      timer: ROUND_TICKS,
      visitor: null
    });
  }

  roundStart () {
    this.setState({
      actions: this.getActions(),
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
    this.handleLose();
  }

  storageInitialize () {
    if (!localStorage[STORAGE_KEY]) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ highScore: 0 }));
    }
  }

  storageRead (key) {
    return JSON.parse(localStorage[STORAGE_KEY])[key];
  }

  storageWrite (key, value) {
    const storage = JSON.parse(localStorage[STORAGE_KEY]);
    storage[key] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
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
            callback={that.actionClicked.bind(that)}
            gameStatus={that.state.status}
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
        <h1>{this.state.visitor}</h1>
      </div>
    );
  }
}
