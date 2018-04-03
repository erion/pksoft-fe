import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';

const containerStyle = {
  width: '100%',
  margin: '0 0 0 1rem'
}
const inputStyle = {width: '80%'}

const SearchComponent = () => {
  let searchComponent = window.location.pathname.includes('login') || window.location.pathname === '/'
   ? null
   : (
    <div style={containerStyle}>
      <TextField
        style={inputStyle}
        hintText="Procurar paciente..."
      />
      <IconButton tooltip="Buscar">
        <SearchIcon />
      </IconButton>
    </div>
  )
  return searchComponent
};

export default SearchComponent;