import React from 'react'
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
import { ENDPOINT_LIST_HISTORY, HistoryModel } from '../../app-config'
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
    if(this.state.patientHistory.patientId) {
      fetch(ENDPOINT_LIST_HISTORY +'?cod_paciente=' + this.state.patientHistory.patientId)
        .then(res => res.json())
        .then(patientHistory => {
          this.setState({ patientHistory: patientHistory });
        });
    }
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
    let tableRow
    let showButton = this.props.activeTab === 2
    let newHistoryBtn

    newHistoryBtn = (showButton)
      ?
        <FloatingActionButton className="floating-button" mini={true} onClick={this.onNewHistory} >
          <ContentAdd />
        </FloatingActionButton>
      : null

    if(this.state.patientHistory.length > 0) {
      tableRow = this.state.patientHistory.map( (row, index) => (
        <ClickableRow key={index} rowData={row} eventFunction={this.onSelectHistory}>
          <TableRowColumn style={{width: '10%'}}>{row.cod_historico}</TableRowColumn>
          <TableRowColumn style={{width: '25%'}}>{row.atributo_historico}</TableRowColumn>
          <TableRowColumn style={{width: '25%'}}>{row.valor_historico}</TableRowColumn>
          <TableRowColumn style={{width: '40%'}}>{row.nome_farmaco}</TableRowColumn>
        </ClickableRow>
      ))
    } else if(this.state.patientHistory.length === 0) {
      tableRow =
        <TableRow>
          <TableRowColumn style={{width: '100%', textAlign: "center"}}>Sem histórico para este paciente</TableRowColumn>
        </TableRow>
    } else {
      tableRow =
        <TableRow>
          <TableRowColumn style={{width: '100%', textAlign: "center"}}>Carregando histórico do paciente...</TableRowColumn>
        </TableRow>
    }

    return (
      <div>
        {newHistoryBtn}
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{width: '10%'}}>ID</TableHeaderColumn>
              <TableHeaderColumn style={{width: '25%'}}>Evento</TableHeaderColumn>
              <TableHeaderColumn style={{width: '25%'}}>Valor (mg)</TableHeaderColumn>
              <TableHeaderColumn style={{width: '40%'}}>Tratamento</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {tableRow}
          </TableBody>
        </Table>
      </div>
    );
  }

}
