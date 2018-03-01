import React from 'react';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const style = {
  display: 'inline-block',
  margin: '0 32px 16px 0'
};

const AppMenu = () => (
  <div>
    <Paper style={style}>
      <Menu>
        <MenuItem primaryText="Pacientes" />
        <MenuItem primaryText="Tratamentos" />
        <MenuItem primaryText="Histórico" />
      </Menu>
    </Paper>
  </div>
);

export default AppMenu;

