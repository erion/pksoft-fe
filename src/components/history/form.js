import React from 'react'
import TextField from 'material-ui/TextField'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import { ENDPOINT_LIST_HISTORY, HistoryModel, messageType } from '../../app-config'

export default class HistoryForm extends React.Component {

  constructor(props) {
    super(props);
    let patientHistory = HistoryModel
    let formError, errorMessage = {}
    //edit
    if(this.props && this.props.patientHistory) {
      patientHistory = this.props.patientHistory
      formError = {formError: false}
      for(let key in patientHistory) {
        errorMessage[key] = {value: null, error: false}
      }
    //insert
    } else {
      formError = {formError: true}
      for(let key in patientHistory) {
        errorMessage[key] = {value: null, error: true}
      }
    }
    patientHistory['patientId'] = props.patientId

    this.state = {
      patientHistory,
      errorMessage,
      formError,
      horario: new Date(),
      data: null
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTimePickerChange = this.handleTimePickerChange.bind(this);
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    this.handleHistorySubmit = this.handleHistorySubmit.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.onFormValidate = this.onFormValidate.bind(this)
  }

  componentDidMount() {
    if(this.props.patientHistory !== undefined)
      this.setState({patientHistory: this.props.patientHistory})
  }

  componentWillUnmount() {
    this.setState({
      patientHistory: HistoryModel
    })
  }

  handleInputChange(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;

    let patientHistory = this.state.patientHistory;
    patientHistory[name] = value
    this.setState({
      patientHistory: patientHistory
    });
  }

  //converts date object to time string (TODO: check how it really is on DB)
  handleTimePickerChange(event, date) {
    let time = date.toTimeString()
    let patientHistory = this.state.patientHistory
    patientHistory['horario'] = time
    this.setState({
      patientHistory: patientHistory
    })
  }

  //converts date object to string (TODO: check how it really is on DB)
  handleDatePickerChange(event, date) {
    let data = date.getDate()+'/'+date.getMonth()+1+'/'+date.getFullYear()
    let patientHistory = this.state.patientHistory
    patientHistory['data'] = data
    this.setState({
      patientHistory: patientHistory
    })
    this.setState({
      data: date
    })
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

  handleHistorySubmit() {
    this.onFormValidate().then(() => {
      if(this.state.formError === false) {
        fetch(ENDPOINT_LIST_HISTORY, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.state.patientHistory)
        })
          .then(res => {
            console.log('post response', res);
            if (res.status === 201 || res.status === 200) {
              this.props.handleShowMessage("Inserido com sucesso", messageType.mSuccess)
              this.props.onSelectHistory(undefined)
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
    let showButton = this.props.activeTab === 2
    let saveHistoryBtn

    saveHistoryBtn = (showButton)
      ?
        <FloatingActionButton className="floating-button" mini={true} onClick={this.handleHistorySubmit}>
          <ContentSave />
        </FloatingActionButton>
      : null

    return (
      <div>
        <form id="history-form">
          <RadioButtonGroup name="evento" onChange={this.handleInputChange} defaultSelected={this.state.patientHistory.evento}>
            <RadioButton value="dose" label="Dose" style={{marginTop:"1rem"}} />
            <RadioButton value="concentracao" label="Concentração" style={{marginTop:"1rem"}} />
          </RadioButtonGroup>

          <TextField
            onChange={this.handleInputChange}
            floatingLabelText="Atributo"
            name="atributo"
            value={this.state.patientHistory.atributo}
            onBlur={this.handleInputBlur}
            errorText={this.state.errorMessage['atributo'].value} /><br />

          <TextField
            onChange={this.handleInputChange}
            floatingLabelText="Valor (mg)"
            name="valor"
            value={this.state.patientHistory.valor}
            onBlur={this.handleInputBlur}
            errorText={this.state.errorMessage['valor'].value} /><br />

          <DatePicker onChange={this.handleDatePickerChange} floatingLabelText="Data" name="data" value={this.state.data} /><br />

          <TimePicker onChange={this.handleTimePickerChange} floatingLabelText="Horário" name="horario" format="24hr" value={this.state.horario} /><br />

          <TextField style={{display:"none"}} name="pacienteId" value={this.state.patientHistory.pacienteId} /><br />
          <TextField disabled={true} floatingLabelText="Paciente" name="pacienteNome" value={this.props.patientName} /><br />

          {/*TODO: need to be changed. will be id not a plain text*/}
          <TextField
            onChange={this.handleInputChange}
            floatingLabelText="Tratamento"
            name="tratamentoId"
            value={this.state.patientHistory.tratamentoId}
            onBlur={this.handleInputBlur}
            errorText={this.state.errorMessage['tratamentoId'].value} /><br />

          {saveHistoryBtn}
        </form>
      </div>
    );
  }

}
