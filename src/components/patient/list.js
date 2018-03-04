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

export default class PatientList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      patients: [],
    };
  }

  componentDidMount() {
    let self = this;           
    fetch('http://localhost:3001/paciente')
      .then(res => res.json())
      .then(patients => {
        self.setState({ patients: patients });
      });
  }

  render() {
      let tableRow = "Carregando lista de pacientes...";

      if(this.state.patients.length > 0) {
        tableRow = this.state.patients.map( (row, index) => (
          <TableRow key={index}>
            <TableRowColumn style={{width: '10%'}}>{row.id}</TableRowColumn>
            <TableRowColumn style={{width: '45%'}}>{row.nome}</TableRowColumn>
            <TableRowColumn style={{width: '45%'}}>{row.cpf}</TableRowColumn>
          </TableRow>
        ))
      }

    return (
      <MuiThemeProvider>
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
        </MuiThemeProvider>
    );
  }

}
