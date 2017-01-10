import { ACTIONS, ROUND_TICKS, STORAGE_KEY } from '../../constants.json';
import { label } from '../../utils.js';
import { reverse } from 'lodash';
import Action from '../Action/Action.jsx';
import Door from '../Door/Door.jsx';
import MessageBoard from '../MessageBoard/MessageBoard.jsx';
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
      message: {
        content: label(''),
        style: 'message--empty'
      },
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
      (action === 'shoot' && this.state.visitor.type === 'werewolf') ||
      (action === 'pay' && this.state.visitor.type === 'pizza')
    ) {
      this.handleWin();
    } else {
      this.handleLose();
    }
  }

  describeVisitor (visitor) {
    return {
      content: (visitor.type === 'werewolf') ? 'A werewolf!' : 'Pizza delivery!',
      style: 'visitor--' + visitor.type
    };
  }

  getActions () {
    return Math.random() < 0.5 ? ACTIONS : reverse(ACTIONS);
  }

  getVisitor () {
    const werewolf = {
      type: 'werewolf',
      properties: {}
    };
    const pizza = {
      type: 'pizza',
      properties: {}
    };
    return Math.random() < 0.5 ? werewolf : pizza;
  }

  handleLose () {

    let messageContent;
    const VISITOR = this.state.visitor.type.toUpperCase();

    if (this.state.timer === 0) {
      messageContent = label('TIMEOUT_VS_' + VISITOR);
    } else {
      messageContent = label('LOST_VS_' + VISITOR);
    }

    const message = {
      content: messageContent,
      style: 'message--lost'
    };

    this.setState({
      message: message,
      roundResult: 'lost',
      score: 0
    });
  }

  handleWin () {
    const updatedScore = this.state.score + 1;
    const updatedHighScore = (updatedScore > this.state.highScore) ? updatedScore : this.state.highScore;

    const message = {
      content: label('WON_VS_' + this.state.visitor.type.toUpperCase()),
      style: 'message--won'
    };

    this.setState({
      highScore: updatedHighScore,
      message: message,
      roundResult: 'won',
      score: updatedScore
    });
    this.storageWrite('highScore', updatedHighScore);
  }

  roundReset () {
    clearInterval(this.interval);
    this.setState({
      actions: this.getActions(),
      message: {
        content: label(''),
        style: 'message--empty'
      },
      roundStatus: 'waiting',
      timer: ROUND_TICKS,
      visitor: this.getVisitor()
    });
  }

  roundStart () {
    const visitor = this.getVisitor();
    const message = this.describeVisitor(visitor);
    this.setState({
      actions: this.getActions(),
      message: message,
      roundStatus: 'playing',
      visitor: visitor
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

        <MessageBoard
          message={this.state.message}
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
