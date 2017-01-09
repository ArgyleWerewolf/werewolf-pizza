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
      roundStatus: 'waiting',
      roundResult: '',
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
      roundResult: 'lost',
      score: 0
    });
  }

  handleWin () {
    const updatedScore = this.state.score + 1;
    const updatedHighScore = (updatedScore > this.state.highScore) ? updatedScore : this.state.highScore;
    this.setState({
      highScore: updatedHighScore,
      roundResult: 'won',
      score: updatedScore
    });
    this.storageWrite('highScore', updatedHighScore);
  }

  roundReset () {
    clearInterval(this.interval);
    this.setState({
      actions: this.getActions(),
      roundStatus: 'waiting',
      timer: ROUND_TICKS,
      visitor: this.getVisitor()
    });
  }

  roundStart () {
    this.setState({
      actions: this.getActions(),
      roundStatus: 'playing',
      visitor: this.getVisitor()
    });
    this.timerStart();
  }

  roundStop () {
    this.timerStop();
    this.setState({
      roundStatus: 'finishing'
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
              index={0}
              roundStatus={this.state.roundStatus}
            />
          </div>
          <div className="column column--third">
            <Timer
              roundStatus={this.state.roundStatus}
              timer={this.state.timer}
            />
            <Door
              onResetRound={this.roundReset.bind(this)}
              onStartRound={this.roundStart.bind(this)}
              roundResult={this.state.roundResult}
              roundStatus={this.state.roundStatus}
              visitor={this.state.visitor}
            />
          </div>
          <div className="column column--third">
            <Action
              action={this.state.actions[1]}
              callback={this.actionClicked.bind(this)}
              index={1}
              roundStatus={this.state.roundStatus}
            />
          </div>
        </div>

        <StateLogger state={this.state} />

      </div>
    );
  }
}
