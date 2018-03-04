import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';

import MenuContainer from './react-redux/containers/menuContainer.js';
import PatientContainer from './react-redux/containers/patientContainer.js';
import SearchComponent from './material-components/search.js';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <MenuContainer />
          <SearchComponent />
          <PatientContainer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
