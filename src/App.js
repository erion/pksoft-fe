import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Snackbar from 'material-ui/Snackbar';
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
        <Component {...rest} {...props} />
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
      user: undefined,
      showMessage: false,
      message: ""
    }

    this.handleAuth = this.handleAuth.bind(this);
    this.handleShowMessage = this.handleShowMessage.bind(this);
  }

  handleAuth(user) {
    this.setState({
      user: user,
      isAuthenticated: true
    })
  }

  handleShowMessage(message, show) {
    this.setState({
      showMessage: show,
      message: message
    });
  }

  handleCloseMessage = () => {
    this.setState({
      showMessage: false,
    });
  };

  render() {
    let messageStyle = {
      top: 0,
      bottom: 'auto',
      left: 0,
      transform: this.state.showMessage ?
          'translate3d(0, 0, 0)' :
          `translate3d(0, -50px, 0)`
    }

    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <div className="app">
            <Snackbar
              open={this.state.showMessage}
              message={this.state.message}
              autoHideDuration={2000}
              onRequestClose={this.handleCloseMessage}
              style={messageStyle}
            />

            <AppMenu />
            <SearchComponent />

            <Route exact path="/" render={props => (
              <Login history={props.history} handleAuth={this.handleAuth} />
            )} />

            <PrivateRoute exact path="/pacientes"
              component={PatientList}
              isAuthenticated={this.state.isAuthenticated}
              handleShowMessage={this.handleShowMessage} />

            <PrivateRoute path="/paciente/:id"
              component={PatientForm}
              isAuthenticated={this.state.isAuthenticated}
              handleShowMessage={this.handleShowMessage} />

            <PrivateRoute exact path="/paciente"
              component={PatientForm}
              isAuthenticated={this.state.isAuthenticated}
              handleShowMessage={this.handleShowMessage} />

            <PrivateRoute exact path="/farmacos"
              component={PharmacoList}
              isAuthenticated={this.state.isAuthenticated}
              handleShowMessage={this.handleShowMessage} />

            <PrivateRoute path="/farmaco/:id"
              component={PharmacoForm}
              isAuthenticated={this.state.isAuthenticated}
              handleShowMessage={this.handleShowMessage} />

            <PrivateRoute exact path="/farmaco/"
              component={PharmacoForm}
              isAuthenticated={this.state.isAuthenticated}
              handleShowMessage={this.handleShowMessage} />

            <PrivateRoute exact path="/simulacao/"
              component={Simulation}
              isAuthenticated={this.state.isAuthenticated}
              handleShowMessage={this.handleShowMessage} />
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
