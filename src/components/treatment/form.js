import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import ContentAdd from 'material-ui/svg-icons/content/add'
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

    this.state = { treatment: TreatmentModel }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let self = this;
    fetch(WSRoot+'/paciente')
      .then(res => res.json())
      .then(patients => {
        self.setState({ patients: patients });
      });

    fetch(WSRoot+'/farmaco')
      .then(res => res.json())
      .then(pharmacos => {
        self.setState({ pharmacos: pharmacos });
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let treatment = this.state.treatment;
    treatment[name] = value
    this.setState({
      treatment: treatment
    });
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

  render() {
    let visibility = this.props.activeTab === 2 ? 'visible' : 'hidden'
    let addButtonStyle = {
      "position": "fixed",
      "bottom": "3rem",
      "right": "2rem",
      "visibility": visibility
    }

    let patientSelect, pharmacoSelect
    if(this.state.patients) {
      patientSelect = this.state.patients.map( (row, index) => (
        <MenuItem key={index} value={row.id} primaryText={row.nome} />
      ))
    }
    if(this.state.pharmacos) {
      pharmacoSelect = this.state.pharmacos.map( (row, index) => (
        <MenuItem key={index} value={row.id} primaryText={row.nome} />
      ))
    }

    return (
      <MuiThemeProvider>
        <div>
          <FlatButton
            label="Novo Tratamento"
            style={{float:"right", minWidth: "3rem", marginTop: "1rem"}}
            primary={true}
            icon={<ContentAdd />}
            onClick={this.onNewPatient}
          />
          <FlatButton
            label="Simular"
            style={{float:"right", minWidth: "3rem", marginTop: "1rem"}}
            primary={true}
            icon={<TimeLineIcon />}
            onClick={this.onNewPatient}
          />

          <form id="treatment-form">
            <SelectField
              floatingLabelText="Paciente"
              items={this.state.patients}
              onChange={this.handleInputChange}
              value={this.state.treatment.paciente}
            >
              {patientSelect}
            </SelectField>

            <SelectField
              floatingLabelText="Fármaco"
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
