import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Nav from './Nav/Nav.js';
import Body from './Body/Body.js';

ReactDOM.render(
  <React.StrictMode>
    <Nav />
    <Body />
  </React.StrictMode>,
  document.getElementById('root')
);
