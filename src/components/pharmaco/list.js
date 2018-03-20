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

export default class PharmacoList extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {
      pharmacos: [],
    };

    this.onSelectPharmaco = this.onSelectPharmaco.bind(this);
  }

  componentDidMount() {
    let self = this;
    fetch(WSRoot+'/farmaco')
      .then(res => res.json())
      .then(pharmacos => {
        self.setState({ pharmacos: pharmacos });
      });
  }

  onSelectPharmaco(pharmaco) {
    this.props.history.push("/farmaco/"+pharmaco.id, {"pharmaco": pharmaco})
  }

  render() {
      let tableRow
      let addButtonStyle = {
        "position": "fixed",
        "bottom": "3rem",
        "right": "2rem"
      }

      if(this.state.pharmacos.length > 0) {
        tableRow = this.state.pharmacos.map( (row, index) => (
          <ClickableRow key={index} rowData={row} eventFunction={this.onSelectPharmaco}>
            <TableRowColumn style={{width: '10%'}}>{row.id}</TableRowColumn>
            <TableRowColumn style={{width: '90%'}}>{row.nome}</TableRowColumn>
          </ClickableRow>
        ))
      } else {
        tableRow =
          <TableRow>
            <TableRowColumn style={{width: '100%', textAlign: "center"}}>Carregando lista de fármacos...</TableRowColumn>
          </TableRow>
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
                <TableHeaderColumn style={{width: '90%'}}>Nome</TableHeaderColumn>
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
