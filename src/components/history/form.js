import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { WSRoot, HistoryModel } from '../../app-config'

export default class HistoryForm extends React.Component {

  constructor(props) {
    super(props);
    let patientHistory = HistoryModel;
    patientHistory['patientId'] = props.patientId

    this.state = { patientHistory }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let patientHistory = this.state.patientHistory;
    patientHistory[name] = value
    this.setState({
      patientHistory: patientHistory
    });
  }

  handleSubmit() {
    let method, path
    if(this.state.patientHistory.id !== undefined && this.state.patientHistory.id !== "") {
      method = 'PUT'
      path = '/historico/'+this.state.patientHistory.id
    } else {
      method = 'POST'
      path = '/historico/'
    }

    fetch(WSRoot+path, {
      method: method,
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
    let addButtonStyle = {
      "position": "fixed",
      "bottom": "3rem",
      "right": "2rem"
    }
    return (
      <MuiThemeProvider>
        <div>
          <h1>Novo histórico</h1>
          <form id="history-form">
            <TextField hintText="Id" style={{display:"none"}} value={this.state.patientHistory.id} name="id" /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Evento" name="evento" value={this.state.patientHistory.evento} /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Atributo" name="atributo" value={this.state.patientHistory.atributo} /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Valor" name="valor" value={this.state.patientHistory.valor} /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Data" name="data" value={this.state.patientHistory.data} /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Horário" name="horario" value={this.state.patientHistory.horario} /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Paciente" name="pacienteId" value={this.state.patientHistory.pacienteId} /><br />
            <TextField onChange={this.handleInputChange} floatingLabelText="Tratamento" name="tratamentoId" value={this.state.patientHistory.tratamentoId} /><br />
            <FloatingActionButton mini={true} style={addButtonStyle} onClick={this.handleSubmit}>
              <ContentSave />
          </FloatingActionButton>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }

}
