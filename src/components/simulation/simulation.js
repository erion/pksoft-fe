import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Link } from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { WSRoot } from '../../app-config'

const orientation = () => {
  console.log("the orientation of the device is now " + screen.orientation.angle)
}

export default class Simulation extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {
      simulation: [],
    };
  }

  componentWillMount() {
    window.addEventListener("orientationchange", orientation)
  }

  componentWillUnmount() {
    window.removeEventListener("orientationchange", orientation)
  }

  componentDidMount() {
    let self = this;
    fetch(WSRoot+'/simulacao?codigo_paciente='+this.props.patientId)
      .then(res => res.json())
      .then(simulation => {
        self.setState({ simulation: simulation[0] });
      });
  }

  render() {
      let simulation = "Carregando simulação..."

      console.log(this.state.simulation)

      if(this.state.simulation) {
        simulation = <img src={"../"+this.state.simulation.path} alt="simulação" />
      }

    return (
      <div>
        {simulation}
      </div>
    );
  }

}
