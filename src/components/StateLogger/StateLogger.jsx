import React from 'react';

require('./StateLogger.scss');

export default class StateLogger extends React.Component {
  render () {
    return (
      <pre className="statelogger">{JSON.stringify(this.props.state, null, 2)}</pre>
    );
  }
}

StateLogger.propTypes = {
  state: React.PropTypes.object
};
