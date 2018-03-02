import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MaterialAppBar from 'material-ui/AppBar';
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import PatientIcon from 'material-ui/svg-icons/maps/directions-walk';
import TreatmentIcon from 'material-ui/svg-icons/action/assignment';
import HistoryIcon from 'material-ui/svg-icons/action/history';

import UserBox from '../material-components/user.js';

const paperStyle = {
  display: 'inline-block',
  margin: '0 32px 16px 0'
};

const muiThemeOverride = {marginTop: '3.5rem'}

const AppMenu = ({menuOpen, onMenuClick}) => {

  return (
    <MuiThemeProvider >
      <div>
        <MaterialAppBar
            title="PKSoft"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonClick={onMenuClick}
        />
        <div className="menu">
          <Drawer open={menuOpen} docked={false} width="60%" style={paperStyle}>
            <Menu>
              <UserBox />
              <MenuItem primaryText="Pacientes" leftIcon={<PatientIcon />} />
              <MenuItem primaryText="Tratamentos" leftIcon={<TreatmentIcon />} />
              <MenuItem primaryText="Histórico" leftIcon={<HistoryIcon />} />
            </Menu>
          </Drawer>
        </div>
      </div>
    </MuiThemeProvider>
)};

AppMenu.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  onMenuClick: PropTypes.func.isRequired  
}

export default AppMenu
