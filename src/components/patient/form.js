import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import ActionButtons from './actions-container'

export default class PatientForm extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let patient = this.props.location.state && this.props.location.state.patient ? this.props.location.state.patient : {"nome": ""};

    return (
      <MuiThemeProvider>
        <div>
          <ActionButtons />
          <TextField hintText="Nome" value={patient.nome} /><br />
          <TextField hintText="CPF" value={patient.cpf} /><br />
          <TextField hintText="RG" value={patient.rg} /><br />
          <TextField hintText="Nascimento" value={patient.nascimento} /><br />
          <TextField hintText="Peso" value={patient.peso} /><br />
          <TextField hintText="Altura" value={patient.altura} /><br />
          <TextField hintText="Cr paciente" value={patient.cr_paciente} /><br />
          <TextField hintText="Unidade de internação" value={patient.unidade_tratamento} /><br />
          <TextField hintText="OBSERVAÇÃO" value={patient.observacao} /><br />
          <TextField hintText="Telefone" value={patient.telefone} /><br />
          <TextField hintText="Genero" value={patient.genero} /><br />
          <TextField hintText="Agente saúde" value={patient.agente_saude} /><br />
        </div>
      </MuiThemeProvider>
    );
  }

}
