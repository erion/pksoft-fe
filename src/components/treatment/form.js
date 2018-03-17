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
    treatment['paciente'] = props.patientId

    this.state = { treatment: TreatmentModel }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSimulate = this.onSimulate.bind(this)
  }

  handleInputChange(event, index, value) {
    let treatment = this.state.treatment;
    treatment['farmaco'] = value
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

  componentWillUnmount() {
    //not working as expected. Clear the form on other way if needed
    this.setState({
      treatment: TreatmentModel
    })
  }

  onSimulate() {
    this.props.history.push("/simulacao/")
  }

  render() {
    let visibility = this.props.activeTab === 2 ? 'visible' : 'hidden'
    let addButtonStyle = {
      "position": "fixed",
      "bottom": "3rem",
      "right": "2rem",
      "visibility": visibility
    }

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

          <h3 style={{textAlign: "center"}}>Novo tratamento</h3>

          <form id="treatment-form">
            <TextField style={{display:"none"}} name="pacienteId" value={this.state.treatment.paciente} /><br />
            <TextField disabled={true} floatingLabelText="Paciente" name="pacienteNome" value={this.props.patientName} /><br />

            <SelectField
              floatingLabelText="Fármaco"
              name="farmaco"
              items={this.state.pharmacos}
              onChange={this.handleInputChange}
              value={this.state.treatment.farmaco}
            >
              {pharmacoSelect}
            </SelectField>

            <FloatingActionButton mini={true} style={addButtonStyle} onClick={this.handleSubmit}>
              <ContentSave />
          </FloatingActionButton>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }

}
