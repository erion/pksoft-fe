import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MaterialAppBar from 'material-ui/AppBar';
import Menu from './menu.js';

const style = {
  display: 'inline-block',
  margin: '0 32px 16px 0'
};

const AppBarComponent = () => (
  <MuiThemeProvider>
    <div>
      <MaterialAppBar
          title="PKSoft"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      <Menu />
    </div>
  </MuiThemeProvider>
);

export default AppBarComponent;

