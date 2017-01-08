import React from 'react';

require('./Visitor.scss');

export default class Visitor extends React.Component {

  render () {

    if (this.props.gameStatus === 'waiting') {
      return null;
    }

    return (
      <div className="visitor">
        {this.props.visitor}
      </div>
    );
  }
}

Visitor.propTypes = {
  gameStatus: React.PropTypes.string.isRequired,
  visitor: React.PropTypes.string.isRequired
};
