import React from 'react';

require('./ScoreBoard.scss');

export default class ScoreBoard extends React.Component {
  render () {
    return (
      <div className="scoreboard">
        <div className="row">
          <div className="column column--full">
            <ul>
              <li><strong>High Score:</strong> {this.props.highScore}</li>
              <li><strong>Current Score:</strong> {this.props.score}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ScoreBoard.propTypes = {
  highScore: React.PropTypes.number.isRequired,
  score: React.PropTypes.number.isRequired
};
