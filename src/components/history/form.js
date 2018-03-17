import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import { WSRoot, HistoryModel } from '../../app-config'

export default class HistoryForm extends React.Component {

  constructor(props) {
    super(props);
    let patientHistory = HistoryModel;
    patientHistory['patientId'] = props.patientId

    this.state = {
      patientHistory,
      horario: new Date(),
      data: null
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTimePickerChange = this.handleTimePickerChange.bind(this);
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    this.handleHistorySubmit = this.handleHistorySubmit.bind(this);
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

  handleHistorySubmit() {
    fetch(WSRoot+'/historico/', {
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
      patientHistory: HistoryModel
    })
  }

  render() {
    let visibility = this.props.activeTab === 1 ? 'visible' : 'hidden'
    let addButtonStyle = {
      "position": "fixed",
      "bottom": "3rem",
      "right": "2rem",
      "visibility": visibility
    }
    return (
      <MuiThemeProvider>
        <div>
          <h3 style={{textAlign: "center"}}>Novo histórico</h3>
          <form id="history-form">
            <RadioButtonGroup name="evento" onChange={this.handleInputChange} defaultSelected={this.state.patientHistory.evento}>
              <RadioButton value="dose" label="Dose" style={{marginTop:"1rem"}} />
              <RadioButton value="concentracao" label="Concentração" style={{marginTop:"1rem"}} />
            </RadioButtonGroup>
            <TextField onChange={this.handleInputChange} floatingLabelText="Atributo" name="atributo" value={this.state.patientHistory.atributo} /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Valor" name="valor" value={this.state.patientHistory.valor} /><br />
            <DatePicker onChange={this.handleDatePickerChange} floatingLabelText="Data" name="data" value={this.state.data} /><br />
            <TimePicker onChange={this.handleTimePickerChange} floatingLabelText="Horário" name="horario" format="24hr" value={this.state.horario} /><br />
            <TextField style={{display:"none"}} name="pacienteId" value={this.state.patientHistory.pacienteId} /><br />
            <TextField disabled={true} floatingLabelText="Paciente" name="pacienteNome" value={this.props.patientName} /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Tratamento" name="tratamentoId" value={this.state.patientHistory.tratamentoId} /><br />
            <FloatingActionButton mini={true} style={addButtonStyle} onClick={this.handleHistorySubmit}>
              <ContentSave />
          </FloatingActionButton>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }

}
