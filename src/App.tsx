import { DeleteForever, ChatBubbleOutline } from '@mui/icons-material';
import { Divider, List, ListItemButton, ListItemIcon, ListSubheader, TextField } from '@mui/material';
import { pink } from '@mui/material/colors';
import React, { Fragment, useState } from 'react';
import {
  Button,
  Grid,
  Paper,
  ListItemText,

} from "@material-ui/core";
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts'
import StarBorder from '@mui/icons-material/StarBorder';
import { Form } from './Components/Form';
import { Header } from './Components/Header';

function App(): JSX.Element {

  return (
    <div className='App'>
      <Header />
      <Form />
    </div>
  );
}
export default App;
