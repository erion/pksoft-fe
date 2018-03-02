import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';

import AppBar from './material-components/appBar.js';
import TableComponent from './material-components/table.js';
import SearchComponent from './material-components/search.js';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <AppBar />
          <SearchComponent />
          <TableComponent />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
