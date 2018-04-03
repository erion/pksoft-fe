import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import LoginIcon from 'material-ui/svg-icons/action/done'
import { WSRoot, UserModel } from '../../app-config'

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    let user = UserModel
    let authMessage = this.props.history.location.state && this.props.history.location.state.message
      ? this.props.history.location.state.message
      : ""

    this.state = {
      user,
      message: authMessage
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if(this.state.message)
      this.props.handleShowMessage(this.state.message)
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
        pass = this.state.user.senha

    fetch(WSRoot+'/usuario?login='+login+'&senha='+pass, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
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
          this.props.handleShowMessage("Usuário ou senha inválidos")
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
