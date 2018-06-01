import React from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import { ENDPOINT_NEW_HISTORY, ENDPOINT_LIST_TREATMENT, HistoryModel, messageType } from '../../app-config'

function addZero(where) {
  return where.toString().length === 1 ? '0' + where : where
}

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
      hora: new Date(),
      data: new Date(),
      treatments: []
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleTimePickerChange = this.handleTimePickerChange.bind(this)
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this)
    this.setMySqlDate = this.setMySqlDate.bind(this)
    this.handleHistorySubmit = this.handleHistorySubmit.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.onFormValidate = this.onFormValidate.bind(this)
  }

  componentWillMount() {
    //if insert
    if(!this.state.patientHistory.cod_historico) {
      fetch(ENDPOINT_LIST_TREATMENT + '?cod_paciente=' + this.state.patientHistory.patientId)
        .then(res => res.json())
        .then(treatments => {
          this.setState({ treatments: treatments });
        });
    }
  }

  componentDidMount() {
    if(this.props.patientHistory.cod_historico !== '') {
      this.setState({patientHistory: this.props.patientHistory})

      let dateTime = Date.parse(this.state.patientHistory.data_hora_historico)
      dateTime = new Date(dateTime)
      let date = dateTime,
          time = dateTime

      this.setState({
        data: date,
        hora: time
      })
    }
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

  handleSelectChange(event, index, value) {
    let history = this.state.patientHistory;
    history['cod_tratamento'] = value
    this.setState({
      patientHistory: history
    })
  }

  //converts date object to time string
  handleTimePickerChange(event, date) {
    let time = date.toTimeString()
    let patientHistory = this.state.patientHistory
    patientHistory['hora'] = time
    this.setState({
      patientHistory: patientHistory
    })
  }

  //converts date object to string
  handleDatePickerChange(event, date) {
    let data = date.getDate() + '/' + (parseInt(date.getMonth(),10) +1) + '/' + date.getFullYear(),
      patientHistory = this.state.patientHistory

    patientHistory['data'] = data
    this.setState({
      patientHistory: patientHistory
    })
    this.setState({
      data: date
    })
  }

  setMySqlDate(usrDate, usrTime) {
    let date = usrDate || this.state.data,
        time = usrTime || this.state.hora,
        patientHistory = this.state.patientHistory

    if(date === '' || time === '' || date === undefined || time === undefined) {
      this.setState({
        formError: true,
        errorMessage: {
          data_hora_historico: {value: "Data e hora obrigatórios.", error: true}
        }
      })
    } else {
      let date = Date.parse(date + ' ' + time)
      date = new Date(date)
      let day = addZero(date.getDate()),
          month = addZero(parseInt(date.getMonth(), 10)+1),
          hour = addZero(date.getHours()),
          minute = addZero(date.getMinutes())

      patientHistory['data_hora_historico'] = date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':00'
      this.setState({patientHistory: patientHistory})
    }
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
    if(this.state.patientHistory.cod_historico === "") {
      this.onFormValidate().then(() => {
        if(this.state.formError === false) {
          this.setMySqlDate()
          fetch(ENDPOINT_NEW_HISTORY, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain',
            },
            body: JSON.stringify({historico: this.state.patientHistory})
          })
            .then(res => {
              console.log('post response', res);
              if (res.status === 201 || res.status === 200 || res.status === 0) {
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
    } else {
      this.props.handleShowMessage("Históricos não são editáveis", messageType.mInfo)
      this.props.onSelectHistory(undefined)
    }
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

    let treatmentSelect
      if(!this.state.patientHistory.cod_historico) {
        treatmentSelect = this.state.treatments.map( (row, index) => (
          <MenuItem key={index} value={row.cod_tratamento} primaryText={row.nome_farmaco} secondaryText={row.cod_tratamento} />
        ))
      } else {
        treatmentSelect = <MenuItem value={this.state.patientHistory.cod_tratamento}
                            primaryText={this.state.patientHistory.nome_farmaco}
                            secondaryText={this.state.patientHistory.cod_tratamento} />
      }

    return (
      <div>
        <form id="history-form">
          <RadioButtonGroup name="atributo_historico" onChange={this.handleInputChange} defaultSelected={this.state.patientHistory.atributo_historico}>
            <RadioButton value="D" label="Dose" style={{marginTop:"1rem"}} />
            <RadioButton value="C" label="Concentração" style={{marginTop:"1rem"}} />
          </RadioButtonGroup>

          <TextField
            onChange={this.handleInputChange}
            floatingLabelText="Valor (mg)"
            name="valor_historico"
            value={this.state.patientHistory.valor_historico}
            onBlur={this.handleInputBlur}
            errorText={this.state.errorMessage['valor_historico'].value} /><br />

          <DatePicker onChange={this.handleDatePickerChange} floatingLabelText="Data" name="data" value={this.state.data} /><br />

          <TimePicker onChange={this.handleTimePickerChange} floatingLabelText="Horário" name="hora" format="24hr" value={this.state.hora} /><br />

          <TextField disabled={true} floatingLabelText="Paciente" name="pacienteNome" value={this.props.patientName} /><br />

          <SelectField
            floatingLabelText="Tratamento"
            name="cod_tratamento"
            items={this.state.treatments}
            onChange={this.handleSelectChange}
            value={this.state.patientHistory.cod_tratamento}
          >
            {treatmentSelect}
          </SelectField>

          {saveHistoryBtn}
        </form>
      </div>
    );
  }

}
