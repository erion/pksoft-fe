import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';

import AppBar from './material-components/appBar.js';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <AppBar />
      </BrowserRouter>
    );
  }
}

export default App;
