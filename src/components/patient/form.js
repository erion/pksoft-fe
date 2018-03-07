import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import ActionButtons from './actions-container'
import { WSRoot, PatientModel } from '../../app-config'

export default class PatientForm extends React.Component {

  constructor(props) {
    super(props);
    let patient = this.props.location.state && this.props.location.state.patient
    ? this.props.location.state.patient
    : PatientModel;

    this.state = { patient }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let patient = this.state.patient;
    patient[name] = value
    this.setState({
      patient: patient
    });
  }

  handleSubmit() {
    let method, path
    if(this.state.patient.id !== undefined && this.state.patient.id !== "") {
      method = 'PUT'
      path = '/paciente/'+this.state.patient.id
    } else {
      method = 'POST'
      path = '/paciente/'
    }

    fetch(WSRoot+path, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.patient)
    })
      .then(res => {
        console.log('post response', res);
        if (res.status === 201 || res.status === 200) {
          this.setState({
            response: 'Inserido com sucesso.'
          });
        } else {
          this.setState({ response: 'Falha ao inserir registro.' })
        }
      });
    event.preventDefault();
  }

  componentWillUnmount() {
    //not working as expected. Clear the form on other way if needed
    this.setState({
      patient: PatientModel
    })
  }

  render() {
    let addButtonStyle = {
      "position": "fixed",
      "bottom": "3rem",
      "right": "2rem"
    }
    return (
      <MuiThemeProvider>
        <div>
          <ActionButtons history={this.props.history} patient={this.state.patient} />
          <form id="patient-form">
            <TextField hintText="Id" style={{display:"none"}} value={this.state.patient.id} name="id" /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Nome" name="nome" value={this.state.patient.nome} /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="CPF" name="cpf" value={this.state.patient.cpf} /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="RG" name="rg" value={this.state.patient.rg} /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Nascimento" name="nascimento" value={this.state.patient.nascimento} /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Peso" name="peso" value={this.state.patient.peso} /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Altura" name="altura" value={this.state.patient.altura} /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Cr paciente" name="cr_paciente" value={this.state.patient.cr_paciente} /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Unidade de internação" name="unidade_tratamento" value={this.state.patient.unidade_tratamento} /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="OBSERVAÇÃO" name="observacao" value={this.state.patient.observacao} /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Telefone" name="telefone" value={this.state.patient.telefone} /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Genero" name="genero" value={this.state.patient.genero} /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Agente saúde" name="agente_saude" value={this.state.patient.agente_saude} /><br />
            <FloatingActionButton mini={true} style={addButtonStyle} onClick={this.handleSubmit}>
              <ContentSave />
          </FloatingActionButton>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }

}
