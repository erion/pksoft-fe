import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';

import AppMenu from './components/appMenu';
import PatientList from './components/patient/list';
import PatientForm from './components/patient/form';
import SearchComponent from './material-components/search.js';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <AppMenu />
          <SearchComponent />
          <Route exact path="/" component={PatientList} />
          <Route path="/pacientes" render={props => (
            <PatientList history={props.history} />
          )} />
          <Route path="/paciente/:id" component={PatientForm} />
          <Route exact path="/paciente" component={PatientForm} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
