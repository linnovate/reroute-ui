import React from 'react';
import Button from '@material-ui/core/Button';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Filters from './DashBoardComponents/Filters';

import './DashBoard.css';

const muiTheme = {
'fontFamily': 'Lato-Medium',
  'appBar': {
    height: 78,
    color: '#2B405E',
    padding: 36
  },
  palette: {
    type: 'light'
  },
  shape: {
    borderRadius: '30px'
  }
}

function DashBoard() {
  return (
    <MuiThemeProvider >
      <div className="side-bar">
        <div className="logo">Guest Monitoring</div>
        <Filters></Filters>
        <div className="section">
          
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default DashBoard;


 
