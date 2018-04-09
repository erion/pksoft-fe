import React from 'react'
import TextField from 'material-ui/TextField'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Tabs, Tab} from 'material-ui/Tabs'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { WSRoot, PatientModel, messageType } from '../../app-config'
import HistoryList from '../history/list'
import HistoryForm from '../history/form'
import TreatmentList from '../treatment/list'
import TreatmentForm from '../treatment/form'

export default class PatientForm extends React.Component {

  constructor(props) {
    super(props);
    let patient, formError, errorMessage = {}
    //edit
    if(this.props.location.state && this.props.location.state.patient) {
      patient = this.props.location.state.patient
      formError = {formError: false}
      for(let key in patient) {
        errorMessage[key] = {value: null, error: false}
      }
    //insert
    } else {
      patient = PatientModel
      formError = {formError: true}
      for(let key in patient) {
        errorMessage[key] = {value: null, error: true}
      }
    }

    this.state = {
      patient,
      errorMessage,
      formError
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.handlePatientSubmit = this.handlePatientSubmit.bind(this)
    this.onNewPatient = this.onNewPatient.bind(this)
    this.onTabChange = this.onTabChange.bind(this)
    this.onSelectHistory = this.onSelectHistory.bind(this)
    this.onSelectTreatment = this.onSelectTreatment.bind(this)
    this.onFormValidate = this.onFormValidate.bind(this)
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

  componentDidUpdate(prevProps) {
    //for search
    if(this.props.location.state && this.props.location.state.patient) {
      let patientSearch = this.props.location.state.patient
      if(patientSearch !== this.state.patient) {
        this.setState({patient: patientSearch})
      }
    }
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

  //Tab events not working properly https://github.com/mui-org/material-ui/issues/3465
  onTabChange(value) {
    this.setState({tabIndex: value})
    //reset selections on a lazy way, TODO: maybe will need to change
    switch(value) {
      case 1: this.setState({selectedHistory: undefined}); break
      case 2: this.setState({selectedTreatment: undefined}); break
      default:
        this.setState({
          selectedHistory: undefined,
          selectedTreatment: undefined
        });
      break
    }
  }

  handlePatientSubmit() {
    this.onFormValidate().then(() => {
      if(this.state.formError === false) {
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

  componentWillUnmount() {
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
    let savePatientButton = (showButton)
      ?
        <FloatingActionButton className="floating-button" mini={true} onClick={this.handlePatientSubmit}>
          <ContentSave />
        </FloatingActionButton>
      : null

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
          activeTab={this.state.tabIndex}
          handleShowMessage={this.props.handleShowMessage} />

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
          history={this.props.history}
          handleShowMessage={this.props.handleShowMessage} />

    return (
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
            <TextField
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              floatingLabelText="Nome"
              errorText={this.state.errorMessage['nome'].value}
              name="nome"
              value={this.state.patient.nome} /><br />

            <TextField
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              floatingLabelText="CPF"
              errorText={this.state.errorMessage['cpf'].value}
              name="cpf"
              value={this.state.patient.cpf} /><br />

            <TextField
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              floatingLabelText="RG"
              errorText={this.state.errorMessage['rg'].value}
              name="rg"
              value={this.state.patient.rg} /><br />

            <TextField
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              floatingLabelText="Nascimento"
              errorText={this.state.errorMessage['nascimento'].value}
              name="nascimento"
              value={this.state.patient.nascimento} /><br />

            <TextField
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              floatingLabelText="Peso"
              errorText={this.state.errorMessage['peso'].value}
              name="peso"
              value={this.state.patient.peso} /><br />

            <TextField
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              floatingLabelText="Altura"
              errorText={this.state.errorMessage['altura'].value}
              name="altura"
              value={this.state.patient.altura} /><br />

            <TextField
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              floatingLabelText="Cr paciente"
              errorText={this.state.errorMessage['cr_paciente'].value}
              name="cr_paciente"
              value={this.state.patient.cr_paciente} /><br />

            <TextField
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              floatingLabelText="Unidade de internação"
              errorText={this.state.errorMessage['unidade_tratamento'].value}
              name="unidade_tratamento"
              value={this.state.patient.unidade_tratamento} /><br />

            <TextField
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              floatingLabelText="Observação"
              name="observacao"
              value={this.state.patient.observacao}
              multiLine={true} rows={2} rowsMax={10} /><br />

            <TextField
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              floatingLabelText="Telefone"
              errorText={this.state.errorMessage['telefone'].value}
              name="telefone"
              value={this.state.patient.telefone} /><br />

            <RadioButtonGroup name="genero" onChange={this.handleInputChange} defaultSelected={this.state.patient.genero}>
              <RadioButton value="M" label="Masculino" style={{marginTop:"1rem"}} />
              <RadioButton value="F" label="Feminino" style={{marginTop:"1rem"}} />
            </RadioButtonGroup>

            <TextField
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              floatingLabelText="Agente saúde"
              errorText={this.state.errorMessage['agente_saude'].value}
              name="agente_saude"
              value={this.state.patient.agente_saude} /><br />

            {savePatientButton}

          </form>
        </Tab>

        <Tab label="Tratamentos" value={1} onActive={() => this.onTabChange(1)}>
          {treatmentComponent}
        </Tab>

        <Tab label="Histórico" value={2} onActive={() => this.onTabChange(2)}>
          {historyComponent}
        </Tab>

      </Tabs>
    );
  }

}
