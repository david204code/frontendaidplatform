import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import actionCable from 'actioncable';

const CableApp = {}
CableApp.cable = actionCable.createConsumer('ws://aidplatformapiheroku.herokuapp.com/cable')
// CableApp.cable = actionCable.createConsumer('https://aidplatformapiheroku.herokuapp.com/cable')


ReactDOM.render(
  <Router>
    <App cableApp ={CableApp} />
  </Router>,
  document.getElementById('root')
);

// serviceWorker.unregister();
