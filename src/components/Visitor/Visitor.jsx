import React from 'react';

require('./Visitor.scss');

export default class Visitor extends React.Component {

  render () {

    if (this.props.roundStatus === 'waiting') {
      return null;
    }

    let classes = 'visitor visitor--' + this.props.visitor.type;

    if (this.props.roundStatus === 'finishing') {
      classes += ' visitor--' + this.props.roundResult;
    }

    return (
      <div className={classes} />
    );
  }
}

Visitor.propTypes = {
  roundResult: React.PropTypes.string.isRequired,
  roundStatus: React.PropTypes.string.isRequired,
  visitor: React.PropTypes.object.isRequired
};
