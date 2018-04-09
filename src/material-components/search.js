import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';

const containerStyle = {
  width: '100%',
  margin: '0 0 0 1rem'
}
const inputStyle = {width: '80%'}

export default class SearchComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      patientList: [],
      dataSource: []
    }

    this.onSearchChange = this.onSearchChange.bind(this)
  }

  componentDidUpdate(prevProps) {
    let dataSource = []
    if(prevProps.patients !== this.props.patients) {
      let link
      this.props.patients.forEach((patient) => {
        link = {
          pathname: "/paciente/"+patient.id,
          state: {patient: patient}
        }
        dataSource.push({
          text: patient.nome,
          value: (
            <MenuItem
              containerElement={<Link to={link} />}
              primaryText={patient.nome} />
          ),
        })
      })
      this.setState({
        dataSource: dataSource
      })
    }
  }

  onSearchChange(SearchText, dataSource, params) {
    if(params.source === 'click') {
      let search = dataSource.find((v,k) => {
        return v.text === SearchText
      })
      let patientSearch = this.props.patients.find((patient) => {
        return patient.id === search.value
      })
    }
  }

  render() {
    let searchComponent = window.location.pathname.includes('login') || window.location.pathname === '/'
    ? null
    : (
      <div style={containerStyle}>
          <AutoComplete
            style={inputStyle}
            dataSource={this.state.dataSource}
            floatingLabelText="Procurar paciente..."
          />
        <IconButton tooltip="Buscar">
          <SearchIcon />
        </IconButton>
      </div>
    )
    return searchComponent
  }
}
