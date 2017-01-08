import React from 'react';

require('./StateLogger.scss');

export default class StateLogger extends React.Component {
  render () {
    return (
      <div className="statelogger">
        <div className="row">
          <div className="column column--full">
            <pre>{JSON.stringify(this.props.state, null, 2)}</pre>
          </div>
          <p>Test Test</p>
        </div>
      </div>
    );
  }
}

StateLogger.propTypes = {
  state: React.PropTypes.object
};
