import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

export default class PatientList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      patients: [],
    };
  }

  render() {

    return (
      <MuiThemeProvider>
        <RaisedButton label="Novo Paciente" primary={true} style={style} />
        <RaisedButton label="Tratamentos" primary={true} style={style} />
        <RaisedButton label="Histórico" primary={true} style={style} />
      </MuiThemeProvider>
    );
  }

}
