import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import TimeLineIcon from 'material-ui/svg-icons/action/timeline'
import { ENDPOINT_NEW_TREATMENT, ENDPOINT_UPDATE_TREATMENT, TreatmentModel, messageType } from '../../app-config'

export default class TreatmentForm extends React.Component {

  constructor(props) {
    super(props);

    /*
    let treatment = this.props.location.state && this.props.location.state.treatment
    ? this.props.location.state.treatment
    : TreatmentModel;
    */
    let treatment = TreatmentModel
    treatment['cod_paciente'] = props.patientId

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
    treatment['cod_farmaco'] = value
    this.setState({
      treatment: treatment
    })
  }

  handleSubmit() {
    let method = 'POST',
      path = ENDPOINT_NEW_TREATMENT
    if(this.state.treatment.cod_tratamento !== undefined && this.state.treatment.cod_tratamento !== "")
      path = ENDPOINT_UPDATE_TREATMENT + '/' + this.state.treatment.cod_tratamento

    fetch(path, {
      method: method,
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({tratamento: this.state.treatment})
    })
      .then(res => {
        console.log('post response', res);
        if (res.status === 201 || res.status === 200 || res.status === 0) {
          this.props.handleShowMessage("Inserido com sucesso", messageType.mSuccess)
          this.props.onSelectTreatment(undefined)
        } else {
          this.props.handleShowMessage("Falha ao inserir registro", messageType.mError)
        }
      });
    event.preventDefault();
  }

  onSimulate() {
    this.props.history.push("/simulacao/")
  }

  render() {
    let showButton = this.props.activeTab === 1
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
        <MenuItem key={index} value={row.cod_farmaco} primaryText={row.nome_farmaco} />
      ))
    }

    return (
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
          <TextField style={{display:"none"}} name="cod_paciente" value={this.state.treatment.cod_paciente} /><br />
          <TextField disabled={true} floatingLabelText="Paciente" name="pacienteNome" value={this.props.patientName} /><br />

          <SelectField
            floatingLabelText="Fármaco"
            name="cod_farmaco"
            items={this.state.pharmacos}
            onChange={this.handleInputChange}
            value={this.state.treatment.cod_farmaco}
          >
            {pharmacoSelect}
          </SelectField>

          {saveTreatmentBtn}
        </form>
      </div>
    );
  }

}
