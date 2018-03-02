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

const SearchComponent = () => (
  <div style={containerStyle}>
    <MuiThemeProvider>
      <TextField 
        style={inputStyle}
        hintText="Procurar paciente..."
      />
      <IconButton tooltip="Buscar">
        <SearchIcon />
      </IconButton>    
    </MuiThemeProvider>
  </div>
);

export default SearchComponent;