import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add';
import PatientForm from './form'

//https://github.com/mui-org/material-ui/issues/1783
export const ClickableRow = (props) => {
  const {rowData, eventFunction, ...restProps} = props;
  return (
    <TableRow
      {...restProps}
      onMouseDown={()=> props.eventFunction(props.rowData)}>
      {props.children}
    </TableRow>
  )
}

export default class PatientList extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {
      patients: [],
      patientDetailOpen: []
    };

    this.onSelectPatient = this.onSelectPatient.bind(this);
  }

  componentDidMount() {
    let self = this;           
    fetch('http://localhost:3001/paciente')
      .then(res => res.json())
      .then(patients => {
        self.setState({ patients: patients });
      });
  }

  onSelectPatient(patient) {
    console.log(patient);
    this.props.history.push("/paciente/"+patient.id, {"patient": patient})
  }

  render() {
      let tableRow = "Carregando lista de pacientes...";
      let addButtonStyle = {
        "position": "fixed",
        "bottom": "3rem",
        "right": "2rem"
      }
      
      if(this.state.patients.length > 0) {
        tableRow = this.state.patients.map( (row, index) => (
          <ClickableRow key={index} rowData={row} eventFunction={this.onSelectPatient}>
            <TableRowColumn style={{width: '10%'}}>{row.id}</TableRowColumn>
            <TableRowColumn style={{width: '45%'}}>{row.nome}</TableRowColumn>
            <TableRowColumn style={{width: '45%'}}>{row.cpf}</TableRowColumn>
          </ClickableRow>
        ))
      }

    return (
      <MuiThemeProvider>
        <div>
            <Link className="clearfix" to="/paciente">
              <FloatingActionButton mini={true} style={addButtonStyle}>
                <ContentAdd />
              </FloatingActionButton>
            </Link>

            <Table>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn style={{width: '10%'}}>ID</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '45%'}}>Nome</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '45%'}}>CPF</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {tableRow}
              </TableBody>
            </Table>
          </div>
        </MuiThemeProvider>
    );
  }

}
