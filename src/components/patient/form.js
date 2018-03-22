import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Tabs, Tab} from 'material-ui/Tabs'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { WSRoot, PatientModel } from '../../app-config'
import HistoryList from '../history/list'
import HistoryForm from '../history/form'
import TreatmentList from '../treatment/list'
import TreatmentForm from '../treatment/form'

export default class PatientForm extends React.Component {

  constructor(props) {
    super(props);
    let patient = this.props.location.state && this.props.location.state.patient
    ? this.props.location.state.patient
    : PatientModel;

    this.state = { patient }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handlePatientSubmit = this.handlePatientSubmit.bind(this)
    this.onNewPatient = this.onNewPatient.bind(this)
    this.onTabChange = this.onTabChange.bind(this)
    this.onSelectHistory = this.onSelectHistory.bind(this)
    this.onSelectTreatment = this.onSelectTreatment.bind(this)
  }

  componentDidMount() {
    this.setState({tabIndex: 0})
    let self = this;
    fetch(WSRoot+'/farmaco')
      .then(res => res.json())
      .then(pharmacos => {
        self.setState({ pharmacos: pharmacos });
      });
  }

  onNewPatient() {
    this.props.history.push('/paciente')
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

  //Tab events not working properly https://github.com/mui-org/material-ui/issues/3465
  onTabChange(value) {
    this.setState({tabIndex: value})
    //reset selections on a lazy way, TODO: maybe will need to change
    switch(value) {
      case 1: this.setState({selectedHistory: undefined}); break
      case 2: this.setState({selectedTreatment: undefined}); break
      default: break
    }
  }

  handlePatientSubmit() {
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

  onSelectHistory(history) {
    this.setState({selectedHistory: history})
  }

  onSelectTreatment(treatmentId) {
    this.setState({selectedTreatment: treatmentId})
  }

  render() {
    let showButton = this.state.tabIndex === 0;
    let historyComponent, treatmentComponent

    historyComponent = this.state.selectedHistory === undefined
      ?
        <HistoryList
          onSelectHistory={this.onSelectHistory}
          patientId={this.state.patient.id}
          activeTab={this.state.tabIndex} />
      :
        <HistoryForm
          patientHistory={this.state.selectedHistory}
          patientId={this.state.patient.id}
          patientName={this.state.patient.nome}
          activeTab={this.state.tabIndex} />

    treatmentComponent  = this.state.selectedTreatment === undefined
      ?
        <TreatmentList
          onSelectTreatment={this.onSelectTreatment}
          pharmacos={this.state.pharmacos}
          patientId={this.state.patient.id}
          patientName={this.state.patient.nome}
          activeTab={this.state.tabIndex} />
      :
        <TreatmentForm
          treatment={this.state.selectedTreatment}
          pharmacos={this.state.pharmacos}
          patientId={this.state.patient.id}
          patientName={this.state.patient.nome}
          activeTab={this.state.tabIndex}
          history={this.props.history} />

    return (
      <MuiThemeProvider>
        <Tabs value={this.state.tabIndex}>

          <Tab label="Paciente" value={0} onActive={() => this.onTabChange(0)}>
            <FlatButton
              label="Novo Paciente"
              style={{float:"right", minWidth: "3rem", marginTop: "1rem"}}
              primary={true}
              icon={<ContentAdd />}
              onClick={this.onNewPatient}
            />
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
              <TextField onChange={this.handleInputChange} floatingLabelText="Observação"
                name="observacao" value={this.state.patient.observacao}
                multiLine={true} rows={2} rowsMax={10}
              /><br />
              <TextField onChange={this.handleInputChange} floatingLabelText="Telefone" name="telefone" value={this.state.patient.telefone} /><br />
              <RadioButtonGroup name="genero" onChange={this.handleInputChange} defaultSelected={this.state.patient.genero}>
                <RadioButton value="M" label="Masculino" style={{marginTop:"1rem"}} />
                <RadioButton value="F" label="Feminino" style={{marginTop:"1rem"}} />
              </RadioButtonGroup>
              <TextField onChange={this.handleInputChange} floatingLabelText="Agente saúde" name="agente_saude" value={this.state.patient.agente_saude} /><br />

              { (showButton)
                  ?
                  <FloatingActionButton className="floating-button" mini={true} onClick={this.handlePatientSubmit}>
                    <ContentSave />
                  </FloatingActionButton>
                 : null
              }

            </form>
          </Tab>

          <Tab label="Tratamentos" value={1} onActive={() => this.onTabChange(1)}>
            {treatmentComponent}
          </Tab>

          <Tab label="Histórico" value={2} onActive={() => this.onTabChange(2)}>
            {historyComponent}
          </Tab>

        </Tabs>
      </MuiThemeProvider>
    );
  }

}
