import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Snackbar from 'material-ui/Snackbar'
import './App.css'

import { messageType, ENDPOINT_LIST_PATIENTS } from './app-config'
import AppMenu from './components/appMenu'
import Login from './components/user/login'
import PatientList from './components/patient/list'
import PatientForm from './components/patient/form'
import SearchComponent from './material-components/search.js'
import PharmacoList from './components/pharmaco/list'
import PharmacoForm from './components/pharmaco/form'
import SimulationForm from './components/simulation/form'
import SimulationResult from './components/simulation/result'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      rest.isAuthenticated ? (
        <Component {...rest} {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { message: "Usuário não autenticado", messageType: messageType.mInfo }
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
      patients: [],
      filteredPatients: [],
      showMessage: false,
      message: "",
      messageType: messageType.mInfo
    }

    this.handleAuth = this.handleAuth.bind(this);
    this.handleShowMessage = this.handleShowMessage.bind(this);
  }

  componentDidMount() {
    let self = this;
    fetch(ENDPOINT_LIST_PATIENTS)
      .then(res => res.json())
      .then(patients => {
        self.setState({ patients: patients, filteredPatients: patients });
      });
  }

  handleAuth(user) {
    this.setState({
      user: user,
      isAuthenticated: true
    })
  }

  handleShowMessage(message, type) {
    this.setState({
      showMessage: true,
      message: message,
      messageType: type
    });
  }

  handleCloseMessage = () => {
    this.setState({
      showMessage: false,
    });
  }

  render() {
    let messageStyle = {
      width: '100%',
      top: 0,
      bottom: 'auto',
      left: 0,
      transform: this.state.showMessage ?
          'translate3d(0, 0, 0)' :
          `translate3d(0, -50px, 0)`
    }
    let messageBodyStyle = {backgroundColor: this.state.messageType, width: '100%', maxWidth: '100%'}

    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <div className="app">
            {/*https://material-ui.com/demos/snackbars/
              melhorar o snackbar com base no exemplo. Copiar o exemplo requer atualizar as dependências
              quebra muita coisa para alterar neste momento
            */}
            <Snackbar
              open={this.state.showMessage}
              message={this.state.message}
              autoHideDuration={10000}
              onRequestClose={this.handleCloseMessage}
              style={messageStyle}
              bodyStyle={messageBodyStyle}
            />

            <AppMenu />
            <SearchComponent patients={this.state.patients} />

            <Route exact path="/" render={props => (
              <Login history={props.history} handleAuth={this.handleAuth} handleShowMessage={this.handleShowMessage} />
            )} />
            <Route exact path="/login" render={props => (
              <Login history={props.history} handleAuth={this.handleAuth} handleShowMessage={this.handleShowMessage} />
            )} />

            <PrivateRoute exact path="/pacientes"
              component={PatientList}
              patients={this.state.filteredPatients}
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
              component={SimulationForm}
              isAuthenticated={this.state.isAuthenticated}
              handleShowMessage={this.handleShowMessage} />

            <PrivateRoute exact path="/simulacao/:patientId"
              component={SimulationResult}
              isAuthenticated={this.state.isAuthenticated}
              handleShowMessage={this.handleShowMessage} />
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
