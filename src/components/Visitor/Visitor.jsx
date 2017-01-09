import { label } from '../../utils.js';
import React from 'react';

require('./Visitor.scss');

export default class Visitor extends React.Component {

  render () {

    if (this.props.gameStatus === 'waiting') {
      return null;
    }

    const classes = 'visitor visitor--' + this.props.visitor;
    let visitorLabel;
    if (this.props.gameStatus === 'playing') {
      visitorLabel = (this.props.visitor === 'werewolf') ? label('VISITOR_WEREWOLF') : label('VISITOR_PIZZA');
    }

    return (
      <div className={classes}>
        {visitorLabel}
      </div>
    );
  }
}

Visitor.propTypes = {
  gameStatus: React.PropTypes.string.isRequired,
  visitor: React.PropTypes.string.isRequired
};
