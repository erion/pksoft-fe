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
import ContentAdd from 'material-ui/svg-icons/content/add'
import { TreatmentModel } from '../../app-config'
import { ClickableRow } from '../../material-components/clickableRowTable'

export default class TreatmentList extends React.Component {

  constructor(props, context) {
    super(props);

    this.state = {
      treatments: [],
    };

    this.onSelectTreatment = this.onSelectTreatment.bind(this)
    this.onNewTreatment = this.onNewTreatment.bind(this)
  }

  componentWillMount() {
    this.setState({ treatments: this.props.treatments });
  }

  onSelectTreatment(treatment) {
    this.setState({selectedTreatment: treatment})
    this.props.onSelectTreatment(treatment)
  }

  onNewTreatment() {
    this.props.onSelectTreatment(TreatmentModel)
  }

  render() {
    let tableRow
    let showButton = this.props.activeTab === 1
    let newTreatmentBtn

    newTreatmentBtn = (showButton)
      ?
        <FloatingActionButton className="floating-button" mini={true} onClick={this.onNewTreatment}>
          <ContentAdd />
        </FloatingActionButton>
      : null


    if(this.state.treatments === undefined) {
      tableRow =
        <TableRow>
          <TableRowColumn style={{width: '100%', textAlign: "center"}}>Carregando tratamentos do paciente...</TableRowColumn>
        </TableRow>
    } else if(this.state.treatments.length > 0 && this.props.pharmacos) {
      tableRow = this.state.treatments.map( (row, index) => {
        var pharmacoName = this.props.pharmacos.find(f => f.cod_farmaco === row.cod_farmaco);
        pharmacoName = pharmacoName.nome_farmaco
      return (
        <ClickableRow key={index} rowData={row} eventFunction={this.onSelectTreatment} >
          <TableRowColumn style={{width: '15%'}}>{row.cod_tratamento}</TableRowColumn>
          <TableRowColumn style={{width: '42%'}}>{this.props.patientName}</TableRowColumn>
          <TableRowColumn style={{width: '42%'}}>{pharmacoName}</TableRowColumn>
        </ClickableRow>
      )})
    } else if(this.state.treatments.length === 0) {
      tableRow =
        <TableRow>
          <TableRowColumn style={{width: '100%', textAlign: "center"}}>Sem tratamentos para este paciente</TableRowColumn>
        </TableRow>
    }

    return (
      <div>
        {newTreatmentBtn}
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{width: '15%'}}>ID</TableHeaderColumn>
              <TableHeaderColumn style={{width: '42%'}}>Paciente</TableHeaderColumn>
              <TableHeaderColumn style={{width: '42%'}}>Fármaco</TableHeaderColumn>
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
