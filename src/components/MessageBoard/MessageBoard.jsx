import React from 'react';

require('./MessageBoard.scss');

export default class MessageBoard extends React.Component {
  render () {

    let message;
    if (this.props.message) {

      const classes = 'message ' + this.props.message.style;
      message = <p className={classes}>{this.props.message.content}</p>;

    }

    return (
      <div className="messageboard">
        <div className="row">
          <div className="column column--full">
            {message}
          </div>
        </div>
      </div>
    );
  }
}

MessageBoard.propTypes = {
  message: React.PropTypes.shape({
    content: React.PropTypes.string,
    style: React.PropTypes.string
  })
};
