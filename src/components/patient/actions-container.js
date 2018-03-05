import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save';

export default class PatientList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      patients: [],
    };
  }

  render() {
    let addButtonStyle = {
      "position": "fixed",
      "bottom": "3rem",
      "right": "2rem"
    }
    return (
      <MuiThemeProvider>
        <div className="clearfix">
          <RaisedButton label="Tratamentos" primary={true} style={{"float":"right", "margin-left": "1rem"}} />
          <RaisedButton label="Histórico" primary={true} style={{"float":"right"}} />
          <FloatingActionButton mini={true} style={addButtonStyle}>
            <ContentSave />
          </FloatingActionButton>
        </div>
      </MuiThemeProvider>
    );
  }

}
