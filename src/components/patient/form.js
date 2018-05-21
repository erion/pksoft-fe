import React from 'react'
import TextField from 'material-ui/TextField'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Tabs, Tab} from 'material-ui/Tabs'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { ENDPOINT_NEW_PATIENTS, ENDPOINT_UPDATE_PATIENTS, ENDPOINT_LIST_PHARMACO,
  PatientModel, messageType } from '../../app-config'
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
      //patient id must be handled by the app
      errorMessage['cod_paciente'] = {value: null, error: false}
    }

    this.state = {
      patient,
      errorMessage,
      formError
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
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
    fetch(ENDPOINT_LIST_PHARMACO)
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

  handleSelectChange(event) {
    this.handleInputChange(event)
    this.handleInputBlur(event)
  }

  handleInputBlur(event) {
    let target = event.target,
      value = target.value,
      name = target.name,
      errorMessage = this.state.errorMessage

    if(value === '') {
      //errorMessage[name] = {value: "Campo obrigatório", error: true}
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
        let method = 'POST',
            path = ENDPOINT_NEW_PATIENTS

        if(this.state.patient.cod_paciente !== undefined && this.state.patient.cod_paciente !== "")
          path = ENDPOINT_UPDATE_PATIENTS + '/' + this.state.patient.cod_paciente

        fetch(path, {
          method: method,
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify({paciente: this.state.patient})
        })
          .then(res => {
            console.log('post response', res);
            if (res.status === 201 || res.status === 200 || res.status === 0) {
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
          patientId={this.state.patient.cod_paciente}
          activeTab={this.state.tabIndex} />
      :
        <HistoryForm
          patientHistory={this.state.selectedHistory}
          onSelectHistory={this.onSelectHistory}
          patientId={this.state.patient.cod_paciente}
          patientName={this.state.patient.nome_paciente}
          activeTab={this.state.tabIndex}
          handleShowMessage={this.props.handleShowMessage} />

    treatmentComponent  = this.state.selectedTreatment === undefined
      ?
        <TreatmentList
          onSelectTreatment={this.onSelectTreatment}
          pharmacos={this.state.pharmacos}
          patientId={this.state.patient.cod_paciente}
          patientName={this.state.patient.nome_paciente}
          activeTab={this.state.tabIndex} />
      :
        <TreatmentForm
          treatment={this.state.selectedTreatment}
          onSelectTreatment={this.onSelectTreatment}
          pharmacos={this.state.pharmacos}
          patientId={this.state.patient.cod_paciente}
          patientName={this.state.patient.nome_paciente}
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
            <TextField hintText="Id" style={{display:"none"}} value={this.state.patient.cod_paciente} name="id" /><br />
            <TextField
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              floatingLabelText="Nome"
              errorText={this.state.errorMessage['nome_paciente'].value}
              name="nome_paciente"
              value={this.state.patient.nome_paciente} /><br />

            <TextField
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              floatingLabelText="CPF"
              errorText={this.state.errorMessage['cpf_paciente'].value}
              name="cpf_paciente"
              value={this.state.patient.cpf_paciente} /><br />

            <TextField
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              floatingLabelText="RG"
              errorText={this.state.errorMessage['rg_paciente'].value}
              name="rg_paciente"
              value={this.state.patient.rg_paciente} /><br />

            <TextField
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              floatingLabelText="Nascimento"
              errorText={this.state.errorMessage['nascimento_paciente'].value}
              name="nascimento_paciente"
              value={this.state.patient.nascimento_paciente} /><br />

            <TextField
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              floatingLabelText="Peso"
              errorText={this.state.errorMessage['peso_paciente'].value}
              name="peso_paciente"
              value={this.state.patient.peso_paciente} /><br />

            <TextField
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              floatingLabelText="Altura"
              errorText={this.state.errorMessage['altura_paciente'].value}
              name="altura_paciente"
              value={this.state.patient.altura_paciente} /><br />

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
              errorText={this.state.errorMessage['unid_int_paciente'].value}
              name="unid_int_paciente"
              value={this.state.patient.unid_int_paciente} /><br />

            <TextField
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              floatingLabelText="Observação"
              name="observacao_paciente"
              value={this.state.patient.observacao_paciente}
              multiLine={true} rows={2} rowsMax={10} /><br />

            <TextField
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              floatingLabelText="Telefone"
              errorText={this.state.errorMessage['telefone_paciente'].value}
              name="telefone_paciente"
              value={this.state.patient.telefone_paciente} /><br />

            <RadioButtonGroup name="genero_paciente" onChange={this.handleSelectChange}
              defaultSelected={this.state.patient.genero_paciente}>
                <RadioButton value='M' label="Masculino" style={{marginTop:"1rem"}} />
                <RadioButton value='F' label="Feminino" style={{marginTop:"1rem"}} />
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
