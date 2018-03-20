import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import Snackbar from 'material-ui/Snackbar';
import { WSRoot, PharmacoModel } from '../../app-config'

export default class PharmacoForm extends React.Component {

  constructor(props) {
    super(props);
    let pharmaco = this.props.location.state && this.props.location.state.pharmaco
    ? this.props.location.state.pharmaco
    : PharmacoModel;

    this.state = {
      pharmaco,
      showMessage: false,
      message: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.setState({
      pharmaco: PharmacoModel
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let pharmaco = this.state.pharmaco;
    pharmaco[name] = value
    this.setState({
      pharmaco: pharmaco
    });
  }

  handleSubmit() {
    let method, path
    if(this.state.pharmaco.id !== undefined && this.state.pharmaco.id !== "") {
      method = 'PUT'
      path = '/farmaco/'+this.state.pharmaco.id
    } else {
      method = 'POST'
      path = '/farmaco/'
    }

    fetch(WSRoot+path, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.pharmaco)
    })
      .then(res => {
        console.log('post response', res);
        if (res.status === 201 || res.status === 200) {
          this.setState({
            showMessage: true,
            message: 'Inserido com sucesso.'
          });
        } else {
          this.setState({
            showMessage: true,
            message: 'Falha ao inserir registro.'
          })
        }
      });
    event.preventDefault();
  }

  handleCloseMessage = () => {
    this.setState({
      showMessage: false,
    });
  };

  render() {
    let addButtonStyle = {
      "position": "fixed",
      "bottom": "3rem",
      "right": "2rem"
    }

    let messageStyle = {
      top: 0,
      bottom: 'auto',
      left: 0,
      transform: this.state.showMessage ?
          'translate3d(0, 0, 0)' :
          `translate3d(0, -50px, 0)`
    }

    return (
      <MuiThemeProvider>
        <div>
          <form id="pharmaco-form">
            <TextField hintText="Id" style={{display:"none"}} value={this.state.pharmaco.id} name="id" /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Nome" name="nome" value={this.state.pharmaco.nome} /><br />
            <FloatingActionButton mini={true} style={addButtonStyle} onClick={this.handleSubmit}>
              <ContentSave />
          </FloatingActionButton>
          </form>
          <Snackbar
            open={this.state.showMessage}
            message={this.state.message}
            autoHideDuration={2000}
            onRequestClose={this.handleCloseMessage}
            style={messageStyle}
          />
        </div>
      </MuiThemeProvider>
    );
  }

}
