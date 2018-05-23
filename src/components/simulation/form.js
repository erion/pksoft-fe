import React from 'react'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import { ENDPOINT_SIMULATION, SimulationModel, messageType } from '../../app-config'

const orientation = () => {
  console.log("the orientation of the device is now " + screen.orientation.angle)
}

export default class SimulationForm extends React.Component {

  constructor(props, context) {
    super(props);

    console.log(props)

    let simulation = SimulationModel
    simulation['cod_paciente'] = props.location.state.patientId

    let formError, errorMessage = {}
    formError = {formError: true}
    for(let key in simulation) {
      errorMessage[key] = {value: null, error: true}
    }
    errorMessage['cod_paciente'].error = false

    this.state = {
      simulation: simulation,
      errorMessage,
      formError,
    };

    this.handleSimulationSubmit = this.handleSimulationSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.onFormValidate = this.onFormValidate.bind(this)
  }

  componentWillMount() {
    window.addEventListener("orientationchange", orientation)
  }

  componentWillUnmount() {
    window.removeEventListener("orientationchange", orientation)
  }

  handleInputChange(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;

    let simulation = this.state.simulation;
    simulation[name] = value
    this.setState({
      simulation: simulation
    });
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

  handleSimulationSubmit() {
    console.log(this.state.simulation)
    this.onFormValidate().then(() => {
      if(this.state.formError === false) {


        fetch(ENDPOINT_SIMULATION, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify({simulacao: this.state.simulation})
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

  render() {

    return (
      <form id="simulation">

        <TextField style={{display: 'none'}} name="cod_paciente" value={this.state.simulation.cod_paciente} /><br />

        <TextField
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
          floatingLabelText="Concentração desejada"
          name="concentracao_desejada"
          value={this.state.simulation.concentracao_desejada} /><br />

        <TextField
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
          floatingLabelText="Dose"
          name="dose"
          value={this.state.simulation.dose} /><br />

        <TextField
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
          floatingLabelText="Intervalo"
          name="intervalo"
          value={this.state.simulation.intervalo} /><br />

        <TextField
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
          floatingLabelText="Duração da infusão"
          name="duracao_infusao"
          value={this.state.simulation.duracao_infusao} /><br />

        <TextField
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
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
