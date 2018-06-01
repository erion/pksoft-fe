import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import LoginIcon from 'material-ui/svg-icons/action/done'
import md5 from 'md5'
import { ENDPOINT_LOGIN, UserModel, messageType } from '../../app-config'

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    let user = UserModel
    let authMessage = this.props.history.location.state && this.props.history.location.state.message
      ? this.props.history.location.state.message
      : null

    this.state = {
      user,
      message: authMessage
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if(this.state.message !== null)
      this.props.handleShowMessage(this.state.message, messageType.mInfo)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let user = this.state.user;
    user[name] = value
    this.setState({
      user: user
    });
  }

  handleSubmit() {

    let login = this.state.user.login,
        pass = md5(this.state.user.senha)

    fetch(ENDPOINT_LOGIN, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({usuario: {login: login, senha: pass}})
    })
      .then(res => res.json())
      .then(user => {
        if(user.length > 0) {
          user = user[0]
          this.setState({
            response: 'Login efetuado com sucesso',
            user: user
          })
          this.props.handleAuth(user)
          this.props.history.push("/pacientes")
        } else {
          this.props.handleShowMessage("Usuário ou senha inválidos", messageType.mError)
        }
      })
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form id="login-form">
          <TextField onChange={this.handleInputChange} floatingLabelText="Login" name="login" value={this.state.user.login} /><br />
          <TextField onChange={this.handleInputChange} floatingLabelText="Senha" name="senha" value={this.state.user.senha} type="password" /><br />
          <RaisedButton label="Login" primary={true} onClick={this.handleSubmit} icon={<LoginIcon />} />
        </form>
      </div>
    );
  }

}
