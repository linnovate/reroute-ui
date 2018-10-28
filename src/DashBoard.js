import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';


import GuestHealth from './DashBoardComponents/GuestHealth';
import AssignmentList from './DashBoardComponents/AssignmentList';
import Filters from './DashBoardComponents/Filters';

import './DashBoard.css';


const theme = createMuiTheme({
  // palette: {
  //   primary: '#337ab7',
  //   secondary: {
  //     main: '#f44336',
  //   },
  //   typography: {
  //     useNextVariants: true,
  //   },
  // },
});


function DashBoard() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="side-bar">
        <div className="logo">Guest Monitoring</div>
        <Filters></Filters>
      </div>
      <div className="section">
          <GuestHealth></GuestHealth>
          <AssignmentList></AssignmentList>
      </div>
    </MuiThemeProvider>
  );
}

export default DashBoard;


 
