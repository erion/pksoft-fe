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
import { Link } from 'react-router-dom';

import UserBox from '../material-components/user.js';

const paperStyle = {
  display: 'inline-block',
  margin: '0 32px 16px 0'
};

const muiThemeOverride = {marginTop: '3.5rem'}

export default class AppMenu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false
    }

    this.onMenuClick = this.onMenuClick.bind(this);
  }

  onMenuClick() {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  render () {
    return (
      <MuiThemeProvider >
        <div>
          <MaterialAppBar
              title="PKSoft"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onLeftIconButtonClick={this.onMenuClick}
          />
          <div className="menu">
            <Drawer open={this.state.menuOpen} docked={false} width="60%" style={paperStyle}>
              <Menu>
                <UserBox />
                <Link to="/pacientes"><MenuItem primaryText="Pacientes" leftIcon={<PatientIcon />} /></Link>
                <MenuItem primaryText="Tratamentos" leftIcon={<TreatmentIcon />} />
                <MenuItem primaryText="Histórico" leftIcon={<HistoryIcon />} />
              </Menu>
            </Drawer>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
