import React from 'react';
import Chip from '@material-ui/core/Chip';
import Drawer from '@material-ui/core/Drawer';
import axios from 'axios';
import moment from 'moment';

import DrawerProfile from './../DrawerProfile';

import checkIn from './../../assets/img/checkIn.svg'

import './GuestHealth.scss';

class GuestHealth extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        openDrawer: false,
        data: [],
        currentGuest:'',
        byDate: {}
      };
      this.loadGuests = this.loadGuests.bind(this);
      this.loadGuests();
      this.handleChipClick = this.handleChipClick.bind(this);
      this.closeDrawer = this.closeDrawer.bind(this);
      this.currentDate;
  }

  handleChipClick(index){
    console.log('index',index)
    this.currentGuest = index;
    this.currentGuest.bookingFrom = moment(this.currentGuest.bookingFrom).format('MMMM Do YYYY');
    this.currentGuest.bookingTo = moment(this.currentGuest.bookingTo).format('MMMM Do YYYY');
    if (!this.currentGuest.roomNumber) this.currentGuest.roomNumber = '';
    this.setState({'openDrawer': true});
  }

  closeDrawer(){
    this.setState({'openDrawer': false});
  }

  loadGuests = () => {
     const query = `{
      shob(uid:"1b630e90-d122-11e8-ac31-3f9e7cf66502",dateRange: 7) {
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
      this.setState({'data': res.data.data.shob.data});
      this.currentDate = res.data.data.shob.date;
      console.log('length data: ',res.data.data.shob.data.length)
      let byDate = {};
      res.data.data.shob.data.forEach(function(d){
        if (new Date(d.bookingFrom).toDateString().replace(/ /g,"-") in byDate) {
          byDate[new Date(d.bookingFrom).toDateString().replace(/ /g,"-")].push(d);
        }
        else {
          byDate[new Date(d.bookingFrom).toDateString().replace(/ /g,"-")] = [];
          byDate[new Date(d.bookingFrom).toDateString().replace(/ /g,"-")].push(d);
        }
      })
      this.setState({'byDate': byDate});
      console.log('byDate array',byDate)
    })
      .catch(function (error) {
          console.log(error);
      });
    }


   
  render() {   
      return (
      <div className="guest-health">
        <div className="title">GUEST HEALTH</div>
             <div className="by-days">
             { Object.keys(this.state.byDate).map(key =>  
              <div className="wrapper-tags">
              {this.state.byDate[key].map((index,  key) =>
              <div>
                <Chip
                  label={`${index['guest'].firstName} ${index['guest'].lastName}`}
                  key={key}
                  onClick={() => this.handleChipClick(index)}
                  onDelete={this.handleChipClick}
                  className="chip"
                  deleteIcon={<img alt="" src={checkIn} />}
                />
                <div className="tag char">|</div>
                <div className="tag">{`${new Date(index.bookingFrom).getDate()}/${new Date(index.bookingFrom).getMonth()+1} `}
                {`${new Date(index.bookingFrom).toDateString() == new Date(this.currentDate).toDateString() ? `TODAY`: ``}`}</div>
              </div>
              )}   
              </div>
            )}
          </div>
        
        <Drawer className="drawer" anchor="right" open={this.state.openDrawer} >
          <div
            tabIndex={0}
            role="button"
          >
           <DrawerProfile closeDrawer={this.closeDrawer} data={this.currentGuest}></DrawerProfile>
          </div>
        </Drawer>
     </div>
    )
  }
}

export default GuestHealth;
