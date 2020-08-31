import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import logo from '../../Images/QeAssets/QELogo.png'
import MenuIcon from '@material-ui/icons/Menu';
import './QEMainMenu.css';
import Avatar from "@material-ui/core/Avatar";

import Box from '@material-ui/core/Box';
import LanguageSelector from "./LanguageButton"


export default class QEMainMenu extends Component {
    render(props) {
      return (      
        <div style={{backgroundColor: "#353535"}}>
        <AppBar position="static" color="Black">
          <Toolbar style={{marginLeft: "20%", marginRight: "20%"}}>
            <Box display='flex' flexGrow={1}>
            <img src={logo} alt="QE Live" />

            </Box>
            <div>
            </div>


        <Button color="inherit">Insert Log</Button>
        <Button color="inherit">SimC</Button>
        <Button color="inherit">Raid</Button>
        <Button color="inherit">Login</Button>
        <LanguageSelector langSet={this.props.langSet} curLang={this.props.curLang} />
        
        </Toolbar>
      </AppBar>
      </div>
      
      );
    }
  }