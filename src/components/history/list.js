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
import { WSRoot } from '../../app-config'
import { ClickableRow } from '../../material-components/clickableRowTable'

export default class HistoryList extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {
      patientHistory: [],
    };

    this.onDeleteHistory = this.onDeleteHistory.bind(this);
  }

  componentDidMount() {
    let self = this;
    fetch(WSRoot+'/historico')
      .then(res => res.json())
      .then(patientHistory => {
        self.setState({ patientHistory: patientHistory });
      });
  }

  onDeleteHistory(history) {
    //delete row
  }

  onSelectHistory(history) {
    //show all fields of the record, expandable box or modal
  }

  render() {
      let tableRow = "Carregando histórico do paciente...";
      let addButtonStyle = {
        "position": "fixed",
        "bottom": "3rem",
        "right": "2rem"
      }

      if(this.state.patientHistory.length > 0) {
        tableRow = this.state.patientHistory.map( (row, index) => (
          <ClickableRow key={index} rowData={row} eventFunction={this.onSelectHistory}>
            <TableRowColumn style={{width: '10%'}}>{row.id}</TableRowColumn>
            <TableRowColumn style={{width: '30%'}}>{row.evento}</TableRowColumn>
            <TableRowColumn style={{width: '30%'}}>{row.valor}</TableRowColumn>
            <TableRowColumn style={{width: '30%'}}>{row.tratamento}</TableRowColumn>
          </ClickableRow>
        ))
      }

    return (
      <MuiThemeProvider>
        <div>
            <Link className="clearfix" to="/farmaco">
              <FloatingActionButton mini={true} style={addButtonStyle}>
                <ContentAdd />
              </FloatingActionButton>
            </Link>

            <Table>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn style={{width: '10%'}}>ID</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '30%'}}>Evento</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '30%'}}>Valor</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '30%'}}>Tratamento</TableHeaderColumn>
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
