import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { Link } from 'react-router-dom'

export default class PatientList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      patients: [],
    };
  }

  onButtonClick(path) {
    this.props.history.push(path)
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="clearfix">
          <RaisedButton
            label="Tratamentos"
            primary={true}
            style={{float:"right", marginLeft: "1rem"}}
            onClick={()=>{this.onButtonClick('/tratamento')}}
          />
          <RaisedButton
            label="Histórico"
            primary={true}
            style={{float:"right", marginLeft: "1rem"}}
            onClick={()=>{this.onButtonClick('/historico')}}
          />
          <RaisedButton
            style={{float:"right", minWidth: "3rem"}}
            primary={true}
            icon={<ContentAdd />}
            onClick={()=>{this.onButtonClick('/paciente')}}
          />
        </div>
      </MuiThemeProvider>
    );
  }

}
