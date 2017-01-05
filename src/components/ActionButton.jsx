import React from 'react';

export default class ActionButton extends React.Component {

  onClick () {
    this.props.callback(this.props.item);
  }

  render () {

    if (!this.props.visible) {
      return null;
    }

    return (
      <button
        onClick={this.onClick.bind(this)}
      >
        {this.props.item}
      </button>
    );
  }
}

ActionButton.propTypes = {
  callback: React.PropTypes.func.isRequired,
  item: React.PropTypes.string.isRequired,
  visible: React.PropTypes.bool.isRequired
};
