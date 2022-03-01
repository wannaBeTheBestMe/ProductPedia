import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Nav from './Nav/Nav.js';
import Picks from './Picks/Picks.js';

ReactDOM.render(
  <React.StrictMode>
    <Nav />
    <Picks />
  </React.StrictMode>,
  document.getElementById('root')
);
