import { label } from '../../utils.js';
import React from 'react';
import Visitor from '../Visitor/Visitor.jsx';

require('./Door.scss');

export default class Door extends React.Component {

  renderDoor () {
    if (this.props.roundStatus === 'waiting') {
      return (
        <div className="door door--closed" onClick={this.props.onStartRound.bind(this)} />
      );
    } else if (this.props.roundStatus === 'finishing') {
      const doorLabel = (this.props.roundResult === 'won') ? label('DOOR_CLOSE') : label('NEW_GAME');
      return (
        <div className="door door--open round--finished" onClick={this.props.onResetRound.bind(this)}>
          <span className="door-label">{doorLabel}</span>
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
        <Visitor
          roundResult={this.props.roundResult}
          roundStatus={this.props.roundStatus}
          visitor={this.props.visitor}
        />
      </div>
    );
  }
}

Door.propTypes = {
  onResetRound: React.PropTypes.func.isRequired,
  onStartRound: React.PropTypes.func.isRequired,
  roundResult: React.PropTypes.string.isRequired,
  roundStatus: React.PropTypes.string.isRequired,
  visitor: React.PropTypes.object.isRequired
};
