import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';

import Subheader from 'material-ui/Subheader';

import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import NoUser from '../assets/ic_account_circle_black_24dp_2x.png';

const UserBoxComponent = () => (

  <List>
    <Subheader>Bem vindo,</Subheader>
    <ListItem
      primaryText="Usuário"
      leftAvatar={<Avatar src={NoUser} />}
      rightIcon={<EditIcon />}
    />
    <Divider />
  </List>
);

export default UserBoxComponent;