import React from 'react';

require('./StateLogger.scss');

export default class StateLogger extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggle () {
    this.setState({
      open: !this.state.open
    });
  }

  render () {

    let logger;

    if (this.state.open) {
      logger = (
        <pre className="statelogger statelogger-state" onClick={this.toggle.bind(this)}>{JSON.stringify(this.props.state, null, 2)}</pre>
      );
    } else {
      logger = <button className="statelogger statelogger-button" onClick={this.toggle.bind(this)}>Show State</button>;
    }

    return logger;
  }
}

StateLogger.propTypes = {
  state: React.PropTypes.object
};
