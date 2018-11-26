import React from 'react';

import DATA from './DashBoardComponents/data';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';


import GuestHealth from './DashBoardComponents/GuestHealth';
import AssignmentList from './DashBoardComponents/AssignmentList';
import Filters from './DashBoardComponents/Filters';

import './DashBoard.css';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      date: '',
      range: 7,
      status: 'All',
      filteredData : null,
      dateChanged: false,
      masterID: null
    };
    this.changeRange = this.changeRange.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.changeCustomRange = this.changeCustomRange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.markThisGuest = this.markThisGuest.bind(this);
    this.data = null;
    // window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
  }

  loadResults(){
    const query = `{
      shob(uid:"1b630e90-d122-11e8-ac31-3f9e7cf66502",dateRange: ${this.state.range},dateFrom: "${this.state.date}") {
        data {
          bookID
          hotelID
          masterID
          roomType
          roomNumber
          adultCount
          childCount
          infantCount
          bookingFrom
          bookingTo
          state
          guest{
            firstName
            lastName
            gender
          }
        } 
      date
       }
      }`;
    new DATA('post', query).then(res => {
      this.date = res.data.data.shob.date;
      this.setState({
        data: res.data.data.shob.data,
        date: !this.state.date ? res.data.data.shob.date: this.state.date
       });
      }),function(err) {
      console.log('err',err);
   }
  };

  componentDidMount(){
    this.loadResults();
  }

  handleDateChange() {
    this.setState({
      'dateChanged':false,
      'date':''
    });
  }

  changeRange(range){
    this.setState({'range':range},function(){
      this.loadResults();
    });
  }

  changeStatus(status){
    this.setState({ 'status': status })
  }

  changeCustomRange(key, value){
    if (key === 'from')
      this.setState({'date': value, 'dateChanged': true});
    else this.setState({'range': value, 'dateChanged': true});
  }

  markThisGuest(masterID){
    this.setState({masterID});
  }

  render(){
    console.log('444444444444',this.state.date)
    return (
      <MuiThemeProvider theme={theme}>
        <div className="side-bar">
          <div className="logo">Guest Monitoring</div>
          <Filters
           onChangeRange={this.changeRange} 
           onChangeStatus={this.changeStatus} 
           currentDate={this.state.date} 
           onChangeCustomRange={this.changeCustomRange} 
           updateDateChange ={this.handleDateChange}></Filters>
        </div>
        <div className="section">
          <GuestHealth 
            data={this.state.data} 
            status={this.state.status} 
            date={this.state.date} 
            range={this.state.range} 
            dateChanged={this.state.dateChanged}
            onMarkThisGuest={this.markThisGuest}>
          </GuestHealth>
          <AssignmentList 
            data={this.state.data}
            currentGuest={this.state.masterID}>
          </AssignmentList>
        </div>
      </MuiThemeProvider>
    );
   }
  }

  export default DashBoard;


 
