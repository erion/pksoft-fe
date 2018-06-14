import React from 'react'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import { SimulationModel, messageType } from '../../app-config'

export default class SimulationForm extends React.Component {

  constructor(props, context) {
    super(props);

    let simulation = SimulationModel
    simulation['cod_paciente'] = props.location.state.patientId

    this.state = {
      simulation: simulation,
    };

    this.handleSimulationSubmit = this.handleSimulationSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;

    let simulation = this.state.simulation;
    simulation[name] = value
    this.setState({
      simulation: simulation,
      simulationData: undefined
    });
  }

  handleSimulationSubmit() {
    this.props.history.push("/simulacao/"+this.state.simulation.cod_paciente, {"simulationData": this.state.simulation})
    event.preventDefault();
  }

  render() {

    return (
      <form id="simulation">

        <TextField style={{display: 'none'}} name="cod_paciente" value={this.state.simulation.cod_paciente} /><br />

        <TextField
          onChange={this.handleInputChange}
          floatingLabelText="Concentração desejada (ml)"
          name="concentracao_desejada"
          value={this.state.simulation.concentracao_desejada} /><br />

        <TextField
          onChange={this.handleInputChange}
          floatingLabelText="Dose (ml)"
          name="dose"
          value={this.state.simulation.dose} /><br />

        <TextField
          onChange={this.handleInputChange}
          floatingLabelText="Intervalo (h)"
          name="intervalo"
          value={this.state.simulation.intervalo} /><br />

        <TextField
          onChange={this.handleInputChange}
          floatingLabelText="Duração da infusão (h)"
          name="duracao_infusao"
          value={this.state.simulation.duracao_infusao} /><br />

        <TextField
          onChange={this.handleInputChange}
          floatingLabelText="Quantidade de doses"
          name="quantidade_doses"
          value={this.state.simulation.quantidade_doses} /><br />

        <FloatingActionButton className="floating-button" mini={true} onClick={this.handleSimulationSubmit}>
          <ContentSave />
        </FloatingActionButton>
      </form>
    );
  }

}
