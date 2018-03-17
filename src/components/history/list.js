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
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add';
import { WSRoot, HistoryModel } from '../../app-config'
import { ClickableRow } from '../../material-components/clickableRowTable'

export default class HistoryList extends React.Component {

  constructor(props, context) {
    super(props);
    let patientHistory = HistoryModel;
    patientHistory['patientId'] = props.patientId

    this.state = { patientHistory }

    this.onDeleteHistory = this.onDeleteHistory.bind(this)
    this.onSelectHistory = this.onSelectHistory.bind(this)
    this.onNewHistory = this.onNewHistory.bind(this)
  }

  componentDidMount() {
    let self = this;
    let path = '/historico?patientId=' + this.state.patientHistory.patientId
    fetch(WSRoot+path)
      .then(res => res.json())
      .then(patientHistory => {
        self.setState({ patientHistory: patientHistory });
      });
  }

  onDeleteHistory(history) {
    //TODO delete row
  }

  onSelectHistory(history) {
    this.setState({selectedHistory: history})
    this.props.onSelectHistory(history)
  }

  onNewHistory() {
    this.props.onSelectHistory(HistoryModel)
  }

  render() {
      let tableRow = "Carregando histórico do paciente...";
      let visibility = this.props.activeTab === 1 ? 'visible' : 'hidden'
      let addButtonStyle = {
        "position": "fixed",
        "bottom": "3rem",
        "right": "2rem",
        "visibility": visibility
      }

      if(this.state.patientHistory.length > 0) {
        let self = this
        tableRow = this.state.patientHistory.map( (row, index) => (
          <ClickableRow key={index} rowData={row} eventFunction={self.onSelectHistory}>
            <TableRowColumn style={{width: '10%'}}>{row.id}</TableRowColumn>
            <TableRowColumn style={{width: '30%'}}>{row.evento}</TableRowColumn>
            <TableRowColumn style={{width: '30%'}}>{row.valor}</TableRowColumn>
            <TableRowColumn style={{width: '30%'}}>{row.tratamento}</TableRowColumn>
          </ClickableRow>
        ))
      } else {
        tableRow =
          <TableRow>
            <TableRowColumn style={{width: '100%', textAlign: "center"}}>Sem histórico para este paciente</TableRowColumn>
          </TableRow>
      }

    return (
      <MuiThemeProvider>
        <div>
            <FloatingActionButton mini={true} style={addButtonStyle} onClick={this.onNewHistory} >
              <ContentAdd />
            </FloatingActionButton>

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
