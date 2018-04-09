import React from 'react'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import { WSRoot, PharmacoModel, messageType } from '../../app-config'

export default class PharmacoForm extends React.Component {

  constructor(props) {
    super(props);
    let pharmaco, formError, errorMessage = {}
    //edit
    if(this.props.location.state && this.props.location.state.pharmaco) {
      pharmaco = this.props.location.state.pharmaco
      formError = {formError: false}
      for(let key in pharmaco) {
        errorMessage[key] = {value: null, error: false}
      }
    //insert
    } else {
      pharmaco = PharmacoModel
      formError = {formError: true}
      for(let key in pharmaco) {
        errorMessage[key] = {value: null, error: true}
      }
    }

    this.state = {
      pharmaco,
      errorMessage,
      formError
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.onFormValidate = this.onFormValidate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleInputBlur(event) {
    let target = event.target,
      value = target.value,
      name = target.name,
      errorMessage = this.state.errorMessage

    if(value === '') {
      errorMessage[name] = {value: "Campo obrigatório", error: true}
      this.setState({formError: true})
    } else {
      errorMessage[name] = {value: null, error: false}
    }
    this.setState({errorMessage})
  }

  onFormValidate() {
    let formError = false
    for(let key in this.state.errorMessage) {
      if(this.state.errorMessage[key].error === true)
        formError = true
    }
    this.setState({formError: formError})
    return new Promise((resolve, reject) => {resolve(true)})
  }

  handleSubmit() {
    this.onFormValidate().then(() => {
      if(this.state.formError === false) {
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
              this.props.handleShowMessage("Inserido com sucesso", messageType.mSuccess)
            } else {
              this.props.handleShowMessage("Falha ao inserir registro", messageType.mError)
            }
          });
      } else {
        this.props.handleShowMessage("Revise os erros nos campos", messageType.mError)
      }
    })
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
            <TextField
              onChange={this.handleInputChange}
              floatingLabelText="Nome"
              name="nome"
              value={this.state.pharmaco.nome}
              onBlur={this.handleInputBlur}
              errorText={this.state.errorMessage['nome'].value} /><br />

            <FloatingActionButton mini={true} style={addButtonStyle} onClick={this.handleSubmit}>
              <ContentSave />
          </FloatingActionButton>
          </form>
        </div>
    );
  }

}
