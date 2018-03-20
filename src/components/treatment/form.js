import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import TimeLineIcon from 'material-ui/svg-icons/action/timeline'
import { WSRoot, TreatmentModel } from '../../app-config'

export default class TreatmentForm extends React.Component {

  constructor(props) {
    super(props);

    /*
    let treatment = this.props.location.state && this.props.location.state.treatment
    ? this.props.location.state.treatment
    : TreatmentModel;
    */
    let treatment = TreatmentModel
    treatment['codigo_paciente'] = props.patientId

    this.state = { treatment: TreatmentModel }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onSimulate = this.onSimulate.bind(this)
  }

  componentDidMount() {
    if(this.props.treatment !== undefined)
      this.setState({treatment: this.props.treatment})
  }

  componentWillUnmount() {
    this.setState({
      treatment: TreatmentModel
    })
  }

  handleInputChange(event, index, value) {
    let treatment = this.state.treatment;
    treatment['codigo_farmaco'] = value
    this.setState({
      treatment: treatment
    })
  }

  handleSubmit() {
    let method, path
    if(this.state.treatment.id !== undefined && this.state.treatment.id !== "") {
      method = 'PUT'
      path = '/tratamento/'+this.state.treatment.id
    } else {
      method = 'POST'
      path = '/tratamento/'
    }

    fetch(WSRoot+path, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.treatment)
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

  onSimulate() {
    this.props.history.push("/simulacao/")
  }

  render() {
    let showButton = this.props.activeTab === 2
    let saveTreatmentBtn

    saveTreatmentBtn = (showButton)
      ?
        <FloatingActionButton mini={true} className="floating-button" onClick={this.handleSubmit}>
          <ContentSave />
        </FloatingActionButton>
      : null

    let pharmacoSelect
    if(this.props.pharmacos) {
      pharmacoSelect = this.props.pharmacos.map( (row, index) => (
        <MenuItem key={index} value={row.id} primaryText={row.nome} />
      ))
    }

    return (
      <MuiThemeProvider>
        <div>
          <div className="clearfix" style={{width: "100%"}}>
            <FlatButton
              label="Simular"
              style={{float:"right", minWidth: "3rem", marginTop: "1rem"}}
              primary={true}
              icon={<TimeLineIcon />}
              onClick={this.onSimulate}
            />
          </div>

          <form id="treatment-form">
            <TextField style={{display:"none"}} name="codigo_paciente" value={this.state.treatment.codigo_paciente} /><br />
            <TextField disabled={true} floatingLabelText="Paciente" name="pacienteNome" value={this.props.patientName} /><br />

            <SelectField
              floatingLabelText="Fármaco"
              name="codigo_farmaco"
              items={this.state.pharmacos}
              onChange={this.handleInputChange}
              value={this.state.treatment.codigo_farmaco}
            >
              {pharmacoSelect}
            </SelectField>

            {saveTreatmentBtn}
          </form>
        </div>
      </MuiThemeProvider>
    );
  }

}
