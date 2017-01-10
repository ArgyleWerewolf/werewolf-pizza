import { label } from '../../utils.js';
import React from 'react';

require('./Visitor.scss');

export default class Visitor extends React.Component {

  render () {

    if (this.props.roundStatus === 'waiting') {
      return null;
    }

    const classes = 'visitor visitor--' + this.props.visitor.type;
    let visitorLabel;
    if (this.props.roundStatus === 'playing') {
      visitorLabel = (this.props.visitor.type === 'werewolf') ? label('VISITOR_WEREWOLF') : label('VISITOR_PIZZA');
    }

    return (
      <div className={classes}>
        {visitorLabel}
      </div>
    );
  }
}

Visitor.propTypes = {
  roundStatus: React.PropTypes.string.isRequired,
  visitor: React.PropTypes.object.isRequired
};
