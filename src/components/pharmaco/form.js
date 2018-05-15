import React from 'react'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import { ENDPOINT_NEW_PHARMACO, ENDPOINT_UPDATE_PHARMACO, PharmacoModel, messageType } from '../../app-config'

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
      errorMessage['nome_farmaco'] = {value: null, error: true}
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

  handleSubmit(event) {
    this.onFormValidate().then(() => {
      if(this.state.formError === false) {
        let method = 'POST',
            path = ENDPOINT_NEW_PHARMACO

        if(this.state.pharmaco.cod_farmaco !== undefined && this.state.pharmaco.cod_farmaco !== "")
          path = ENDPOINT_UPDATE_PHARMACO + '/'+this.state.pharmaco.cod_farmaco

        fetch(path, {
          method: method,
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify({ "farmaco": this.state.pharmaco })
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
            <TextField hintText="Id" style={{display:"none"}} value={this.state.pharmaco.cod_farmaco} name="cod_farmaco" /><br />
            <TextField
              onChange={this.handleInputChange}
              floatingLabelText="Nome"
              name="nome_farmaco"
              value={this.state.pharmaco.nome_farmaco}
              onBlur={this.handleInputBlur}
              errorText={this.state.errorMessage['nome_farmaco'].value} /><br />

            <FloatingActionButton mini={true} style={addButtonStyle} onClick={this.handleSubmit}>
              <ContentSave />
          </FloatingActionButton>
          </form>
        </div>
    );
  }

}
