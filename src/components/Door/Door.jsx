import { label } from '../../utils.js';
import React from 'react';
import Visitor from '../Visitor/Visitor.jsx';

require('./Door.scss');

export default class Door extends React.Component {

  renderDoor () {
    if (this.props.gameStatus === 'waiting') {
      return (
        <div className="door door--closed" onClick={this.props.onStartRound.bind(this)}>
          {label('DOOR_START')}
        </div>
      );
    } else if (this.props.gameStatus === 'finishing') {
      return (
        <div className="door door--open" onClick={this.props.onResetRound.bind(this)}>
          {label('DOOR_CLOSE')}
        </div>
      );
    }

    return (
      <div className="door door--open" />
    );

  }

  render () {
    return (
      <div className="doorframe">
        {this.renderDoor()}
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
