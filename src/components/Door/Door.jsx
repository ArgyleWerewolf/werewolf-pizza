import React from 'react';
import Visitor from '../Visitor/Visitor.jsx';

require('./Door.scss');

export default class Door extends React.Component {

  renderVisitor () {
    if (this.props.gameStatus === 'waiting') {
      return null;
    }
    return this.props.visitor;
  }

  render () {
    return (
      <div className="doorframe">
        <div className="door">
          <button disabled={this.props.gameStatus !== 'waiting'} onClick={this.props.onStartRound.bind(this)}>Start</button>
          <button disabled={this.props.gameStatus !== 'finishing'} onClick={this.props.onResetRound.bind(this)}>Reset</button>
        </div>
        <div className="visitor">
          <Visitor
            gameStatus={this.props.gameStatus}
            visitor={this.props.visitor}
          />
        </div>
      </div>
    );
  }
}

Door.propTypes = {
  gameStatus: React.PropTypes.string.isRequired,
  onResetRound: React.PropTypes.func.isRequired,
  onStartRound: React.PropTypes.func.isRequired,
  visitor: React.PropTypes.string.isRequired
};
