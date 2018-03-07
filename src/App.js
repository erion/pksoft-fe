import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';

import AppMenu from './components/appMenu';
import PatientList from './components/patient/list';
import PatientForm from './components/patient/form';
import SearchComponent from './material-components/search.js';
import PharmacoList from './components/pharmaco/list';
import PharmacoForm from './components/pharmaco/form';

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
          <Route path="/farmacos" render={props => (
            <PharmacoList history={props.history} />
          )} />
          <Route path="/farmaco/:id" component={PharmacoForm} />
          <Route exact path="/farmaco/" component={PharmacoForm} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
