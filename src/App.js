import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';

import AppMenu from './components/appMenu';
import Login from './components/user/login';
import PatientList from './components/patient/list';
import PatientForm from './components/patient/form';
import SearchComponent from './material-components/search.js';
import PharmacoList from './components/pharmaco/list';
import PharmacoForm from './components/pharmaco/form';
import Simulation from './components/simulation/simulation';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <AppMenu />
          <SearchComponent />
          <Route exact path="/" render={props => (
            <Login history={props.history} />
          )} />
          <Route exact path="/pacientes" render={props => (
            <PatientList history={props.history} />
          )} />
          <Route path="/paciente/:id" component={PatientForm} />
          <Route exact path="/paciente" component={PatientForm} />
          <Route exact path="/farmacos" render={props => (
            <PharmacoList history={props.history} />
          )} />
          <Route path="/farmaco/:id" component={PharmacoForm} />
          <Route exact path="/farmaco/" component={PharmacoForm} />
          <Route exact path="/simulacao/" component={Simulation} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
