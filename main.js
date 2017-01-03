import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component {
  render () {
    return (
      <div>Online... it' s good.</div>
    );
  }
}

function run () {
  ReactDOM.render(<Hello />, document.getElementById('root'));
}

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}
