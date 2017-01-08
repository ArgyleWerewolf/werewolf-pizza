import { ACTIONS, ROUND_TICKS, STORAGE_KEY } from '../../constants.json';
import { reverse } from 'lodash';
import Action from '../Action/Action.jsx';
import Door from '../Door/Door.jsx';
import React from 'react';
import ScoreBoard from '../ScoreBoard/ScoreBoard.jsx';
import StateLogger from '../StateLogger/StateLogger.jsx';
import Timer from '../Timer/Timer.jsx';

require('./WerewolfPizza.scss');

export default class WerewolfPizza extends React.Component {

  constructor (props) {
    super(props);

    this.storageInitialize();

    this.state = {
      actions: this.getActions(),
      highScore: this.storageRead('highScore'),
      score: 0,
      status: 'waiting',
      timer: ROUND_TICKS,
      visitor: this.getVisitor()
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
      actions: this.getActions(),
      status: 'waiting',
      timer: ROUND_TICKS,
      visitor: this.getVisitor()
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

    return (
      <div>

        <ScoreBoard
          highScore={this.state.highScore}
          score={this.state.score}
        />

        <div className="row">
          <div className="column column--third">
            <Action
              action={this.state.actions[0]}
              callback={this.actionClicked.bind(this)}
              gameStatus={this.state.status}
              index={0}
            />
          </div>
          <div className="column column--third">
            <Timer
              gameStatus={this.state.status}
              timer={this.state.timer}
            />
            <Door
              gameStatus={this.state.status}
              onResetRound={this.roundReset.bind(this)}
              onStartRound={this.roundStart.bind(this)}
              visitor={this.state.visitor}
            />
          </div>
          <div className="column column--third">
            <Action
              action={this.state.actions[1]}
              callback={this.actionClicked.bind(this)}
              gameStatus={this.state.status}
              index={1}
            />
          </div>
        </div>

        <StateLogger state={this.state} />

      </div>
    );
  }
}
