import React from 'react';

export default class StateLogger extends React.Component {
  render () {
    return (
      <pre>{JSON.stringify(this.props.state, null, 2)}</pre>
    );
  }
}

StateLogger.propTypes = {
  state: React.PropTypes.object
};
