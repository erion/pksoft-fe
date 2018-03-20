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
import ContentAdd from 'material-ui/svg-icons/content/add'
import { WSRoot, TreatmentModel } from '../../app-config'
import { ClickableRow } from '../../material-components/clickableRowTable'

export default class TreatmentList extends React.Component {

  constructor(props, context) {
    super(props);
    let treatmentModel = TreatmentModel;
    this.state = {
      treatments: treatmentModel,
    };

    this.onSelectTreatment = this.onSelectTreatment.bind(this)
    this.onNewTreatment = this.onNewTreatment.bind(this)
  }

  componentDidMount() {
    fetch(WSRoot+'/tratamento?codigo_paciente='+this.props.patientId)
      .then(res => res.json())
      .then(treatments => {
        this.setState({ treatments: treatments });
      });
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
    let showButton = this.props.activeTab === 2
    let newTreatmentBtn

    newTreatmentBtn = (showButton)
      ?
        <FloatingActionButton className="floating-button" mini={true} onClick={this.onNewTreatment}>
          <ContentAdd />
        </FloatingActionButton>
      : null

    if(this.state.treatments.length > 0 && this.props.pharmacos) {
      tableRow = this.state.treatments.map( (row, index) => {
        var pharmacoName = this.props.pharmacos.find(f => f.id === row.codigo_farmaco);
        pharmacoName = pharmacoName.nome
      return (
        <ClickableRow key={index} rowData={row} eventFunction={this.onSelectTreatment} >
          <TableRowColumn style={{width: '10%'}}>{row.id}</TableRowColumn>
          <TableRowColumn style={{width: '45%'}}>{this.props.patientName}</TableRowColumn>
          <TableRowColumn style={{width: '45%'}}>{pharmacoName}</TableRowColumn>
        </ClickableRow>
      )})
    } else if(this.state.treatments.length === 0) {
      tableRow =
        <TableRow>
          <TableRowColumn style={{width: '100%', textAlign: "center"}}>Sem tratamentos para este paciente</TableRowColumn>
        </TableRow>
    } else {
      tableRow =
        <TableRow>
          <TableRowColumn style={{width: '100%', textAlign: "center"}}>Carregando tratamentos do paciente...</TableRowColumn>
        </TableRow>
    }

    return (
      <MuiThemeProvider>
        <div>
          {newTreatmentBtn}
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={{width: '10%'}}>ID</TableHeaderColumn>
                <TableHeaderColumn style={{width: '45%'}}>Paciente</TableHeaderColumn>
                <TableHeaderColumn style={{width: '45%'}}>Fármaco</TableHeaderColumn>
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
