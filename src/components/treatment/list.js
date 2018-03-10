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
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { WSRoot } from '../../app-config'
import { ClickableRow } from '../../material-components/clickableRowTable'

export default class TreatmentList extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {
      treatments: [],
    };
  }

  componentDidMount() {
    let self = this;
    fetch(WSRoot+'/tratamento')
      .then(res => res.json())
      .then(treatments => {
        self.setState({ treatments: treatments });
      });
  }

  render() {
      let tableRow = "Carregando lista de tratamentos..."
      let visibility = this.props.activeTab === 2 ? 'visible' : 'hidden'
      let addButtonStyle = {
        "position": "fixed",
        "bottom": "3rem",
        "right": "2rem",
        "visibility": visibility
      }

      if(this.state.treatments.length > 0) {
        tableRow = this.state.treatments.map( (row, index) => (
          <ClickableRow key={index} rowData={row}>
            <TableRowColumn style={{width: '10%'}}>{row.id}</TableRowColumn>
            <TableRowColumn style={{width: '45%'}}>{row.paciente}</TableRowColumn>
            <TableRowColumn style={{width: '45%'}}>{row.farmaco}</TableRowColumn>
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
