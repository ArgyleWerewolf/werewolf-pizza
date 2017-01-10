import { label } from '../../utils.js';
import React from 'react';

require('./ScoreBoard.scss');

export default class ScoreBoard extends React.Component {
  render () {
    return (
      <div className="scoreboard">
        <div className="row">
          <div className="column column--quarter" />
          <div className="column column--quarter text--center">
            <p className="score score--current"><strong>{label('CURRENT_SCORE')}</strong> {this.props.score}</p>
          </div>
          <div className="column column--quarter text--center">
            <p className="score score--high"><strong>{label('HIGH_SCORE')}</strong> {this.props.highScore}</p>
          </div>
          <div className="column column--quarter" />
        </div>
      </div>
    );
  }
}

ScoreBoard.propTypes = {
  highScore: React.PropTypes.number.isRequired,
  score: React.PropTypes.number.isRequired
};
