import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component {

  whatsGood () {
    alert('Online');
  }

  render () {
    let davis = 'Please Tell Me.';
    return (
      <button onClick={this.whatsGood}>What's Good? {davis}</button>
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
