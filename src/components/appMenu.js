import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MaterialAppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import BackIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import PatientIcon from 'material-ui/svg-icons/maps/directions-walk';
import PharmacoIcon from 'material-ui/svg-icons/maps/local-pharmacy';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history'

import UserBox from './user/menu-user-box';
import { IconButton } from 'material-ui';

const paperStyle = {
  display: 'inline-block',
  margin: '0 32px 16px 0'
};

export default class AppMenu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false,
      history: createBrowserHistory({})
    }

    this.onMenuClick = this.onMenuClick.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
  }

  onMenuClick() {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  onBackClick() {
    this.state.history.goBack()
  }

  render () {
    let backButton =
      <IconButton tooltip="Voltar" onClick={this.onBackClick}>
        <BackIcon />
      </IconButton>

    return (
      <MuiThemeProvider >
        <div>
          <MaterialAppBar
              title="PKSoft"
              iconElementRight={backButton}
              onLeftIconButtonClick={this.onMenuClick}
              onRightIconButtonClick={this.onMenuClick}
          />
          <div className="menu">
            <Drawer open={this.state.menuOpen} docked={false} width="60%" style={paperStyle}>
              <Menu>
                <UserBox />
                <Link to="/pacientes"><MenuItem primaryText="Pacientes" leftIcon={<PatientIcon />} /></Link>
                <Link to="/farmacos"><MenuItem primaryText="Fármacos" leftIcon={<PharmacoIcon />} /></Link>
              </Menu>
            </Drawer>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
