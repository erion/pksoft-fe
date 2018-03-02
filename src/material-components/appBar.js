import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MaterialAppBar from 'material-ui/AppBar';
import Menu from './menu.js';

const style = {
  display: 'inline-block',
  margin: '0 32px 16px 0'
};

const AppBarComponent = () => (
  <div>
    <MuiThemeProvider>
      <MaterialAppBar
          title="PKSoft"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      <Menu />
    </MuiThemeProvider>
  </div>
);

export default AppBarComponent;

