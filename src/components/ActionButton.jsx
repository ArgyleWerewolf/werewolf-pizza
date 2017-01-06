import React from 'react';

export default class ActionButton extends React.Component {

  onClick () {
    this.props.callback(this.props.action);
  }

  render () {
    return (
      <button
        onClick={this.onClick.bind(this)}
      >
        {this.props.action}
      </button>
    );
  }
}

ActionButton.propTypes = {
  action: React.PropTypes.string.isRequired,
  callback: React.PropTypes.func.isRequired
};
