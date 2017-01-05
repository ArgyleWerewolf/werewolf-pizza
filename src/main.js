import React from 'react';
import ReactDOM from 'react-dom';
import WerewolfPizza from './components/WerewolfPizza.jsx';

function run () {
  ReactDOM.render(<WerewolfPizza />, document.getElementById('root'));
}

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}
