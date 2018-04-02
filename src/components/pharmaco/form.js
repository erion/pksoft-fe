import React from 'react'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import { WSRoot, PharmacoModel } from '../../app-config'

export default class PharmacoForm extends React.Component {

  constructor(props) {
    super(props);
    let pharmaco = this.props.location.state && this.props.location.state.pharmaco
    ? this.props.location.state.pharmaco
    : PharmacoModel;

    this.state = {pharmaco}

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
          this.props.handleShowMessage("Inserido com sucesso", true)
        } else {
          this.props.handleShowMessage("Falha ao inserir registro", true)
        }
      });
    event.preventDefault();
  }

  render() {
    let addButtonStyle = {
      "position": "fixed",
      "bottom": "3rem",
      "right": "2rem"
    }

    return (
        <div>
          <form id="pharmaco-form">
            <TextField hintText="Id" style={{display:"none"}} value={this.state.pharmaco.id} name="id" /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Nome" name="nome" value={this.state.pharmaco.nome} /><br />
            <FloatingActionButton mini={true} style={addButtonStyle} onClick={this.handleSubmit}>
              <ContentSave />
          </FloatingActionButton>
          </form>
        </div>
    );
  }

}
