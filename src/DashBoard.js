import React from 'react';
import axios from 'axios';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';


import GuestHealth from './DashBoardComponents/GuestHealth';
import AssignmentList from './DashBoardComponents/AssignmentList';
import Filters from './DashBoardComponents/Filters';

import './DashBoard.css';


class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      date: '',
      range: 7,
      status: 'All',
      filterData : null
    };
    this.changeRange = this.changeRange.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.data = null;
  }

  loadResults(){
    const query = `{
      shob(uid:"1b630e90-d122-11e8-ac31-3f9e7cf66502",dateRange: ${this.state.range}) {
        data {
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
          }
        } 
      date
       }
     }`;
     axios({
      method: 'post' ,
      url: 'http://localhost:3007/graphql?query='+ query,
    }).then(res => {
      this.setState({
        data: res.data.data.shob.data,
        date: res.data.data.shob.date
       });
    })
      .catch(function (error) {
          console.log(error);
      });
  }

  componentDidMount(){
    this.loadResults();
  }


  changeRange(range){
    this.setState({'range':range},function(){
      this.loadResults();
    });
  }

  changeStatus(status){
    this.setState({'status': status});
    if (status === 'CheckIn' || status === 'CheckOut') {
      let tmp = null; 
      if (status === 'CheckIn') {
        tmp = this.state.data.filter(t => new Date(t.bookingFrom).toDateString() === new Date(this.state.date).toDateString());
      }
      else if (status === 'CheckOut')
        tmp = this.state.data.filter(t => new Date(t.bookingTo).toDateString() === new Date(this.state.date).toDateString());
       this.setState({'filterData': tmp});
    }
  }

  render(){
    return (
      <MuiThemeProvider theme="">
        <div className="side-bar">
          <div className="logo">Guest Monitoring</div>
          <Filters onChangeRange={this.changeRange} onChangeStatus={this.changeStatus}></Filters>
        </div>
        <div className="section">
            <GuestHealth data={this.state.status !== 'All' ? this.state.filterData : this.state.data} status={this.state.status} date={this.state.date}></GuestHealth>
            <AssignmentList data={this.state.status !== 'All' ? this.state.filterData : this.state.data}></AssignmentList>
        </div>
      </MuiThemeProvider>
    );
   }
  }

  export default DashBoard;


 
