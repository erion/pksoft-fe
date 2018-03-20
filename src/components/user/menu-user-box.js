import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import {grey400} from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NoUser from '../../assets/ic_account_circle_black_24dp_2x.png';

const listStyle = { marginTop: '3rem' }
const menuIconStyle = {
  margin: '0px 12px 12px 12px',
  right: '1rem'
}

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu style={menuIconStyle} iconButtonElement={iconButtonElement}>
    <MenuItem>Editar</MenuItem>
    <MenuItem>Logout</MenuItem>
  </IconMenu>
)

const UserBoxComponent = () => (

  <List style={listStyle}>
    <Subheader>Bem vindo,</Subheader>
    <ListItem
      primaryText="Usuário"
      leftAvatar={<Avatar src={NoUser} />}
      rightIcon={rightIconMenu}
    />
    <Divider />
  </List>
);

export default UserBoxComponent;