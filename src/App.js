import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import './App.css';

import AppMenu from './components/appMenu';
import Login from './components/user/login';
import PatientList from './components/patient/list';
import PatientForm from './components/patient/form';
import SearchComponent from './material-components/search.js';
import PharmacoList from './components/pharmaco/list';
import PharmacoForm from './components/pharmaco/form';
import Simulation from './components/simulation/simulation';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      rest.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { message: "Usuário não autenticado" }
          }}
        />
      )
    }
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: undefined
    }

    this.handleAuth = this.handleAuth.bind(this);
  }

  handleAuth(user) {
    this.setState({
      user: user,
      isAuthenticated: true
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <AppMenu />
          <SearchComponent />
          <Route exact path="/" render={props => (
            <Login history={props.history} handleAuth={this.handleAuth} />
          )} />
          <PrivateRoute exact path="/pacientes" isAuthenticated={this.state.isAuthenticated}
            component={PatientList}
            render={props => (
              <PatientList history={props.history} />
            )} />
          <PrivateRoute path="/paciente/:id" component={PatientForm} isAuthenticated={this.state.isAuthenticated} />
          <PrivateRoute exact path="/paciente" component={PatientForm} isAuthenticated={this.state.isAuthenticated} />
          <PrivateRoute exact path="/farmacos" isAuthenticated={this.state.isAuthenticated}
            component={PharmacoList}
            render={props => (
              <PharmacoList history={props.history} />
            )} />
          <PrivateRoute path="/farmaco/:id" component={PharmacoForm} isAuthenticated={this.state.isAuthenticated} />
          <PrivateRoute exact path="/farmaco/" component={PharmacoForm} isAuthenticated={this.state.isAuthenticated} />
          <PrivateRoute exact path="/simulacao/" component={Simulation} isAuthenticated={this.state.isAuthenticated} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
