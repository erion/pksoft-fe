import React from 'react';

import UserBox from './user.js';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import PatientIcon from 'material-ui/svg-icons/maps/directions-walk';
import TreatmentIcon from 'material-ui/svg-icons/action/assignment';
import HistoryIcon from 'material-ui/svg-icons/action/history';

const paperStyle = {
  display: 'inline-block',
  margin: '0 32px 16px 0'
};

const AppMenu = () => (
  <div>
    <Paper style={paperStyle}>
      <Menu>
        <UserBox />
        <MenuItem primaryText="Pacientes" leftIcon={<PatientIcon />} />
        <MenuItem primaryText="Tratamentos" leftIcon={<TreatmentIcon />} />
        <MenuItem primaryText="Histórico" leftIcon={<HistoryIcon />} />
      </Menu>
    </Paper>
  </div>
);

export default AppMenu;

