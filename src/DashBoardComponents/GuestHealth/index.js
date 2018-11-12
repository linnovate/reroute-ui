import React from 'react';
import Chip from '@material-ui/core/Chip';
import Drawer from '@material-ui/core/Drawer';
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
        byDate: {},
        filterData: []
      };
      this.handleChipClick = this.handleChipClick.bind(this);
      this.closeDrawer = this.closeDrawer.bind(this);
      this.currentDate = '';
  }

  handleChipClick(index){
    this.currentGuest = index;
    this.currentGuest.bookingFrom = moment(this.currentGuest.bookingFrom).format('MMMM Do YYYY');
    this.currentGuest.bookingTo = moment(this.currentGuest.bookingTo).format('MMMM Do YYYY');
    if (!this.currentGuest.roomNumber) this.currentGuest.roomNumber = '';
    this.setState({'openDrawer': true});
  }

  buildDataByDate(data){
    let byDate = {};
    data.forEach(function(d){
      var date1 = new Date(d.bookingFrom);
      var date2 = new Date(d.bookingTo);
      date1.setHours(0,0,0,0);
      date2.setHours(24,0,0,0);
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (new Date(d.bookingFrom).toDateString().replace(/ /g,"-") in byDate) {
        byDate[new Date(d.bookingFrom).toDateString().replace(/ /g,"-")].push(d);
      }
      else {
        byDate[new Date(d.bookingFrom).toDateString().replace(/ /g,"-")] = [];
        byDate[new Date(d.bookingFrom).toDateString().replace(/ /g,"-")].push(d);
      }
      for(let i = 1;i < diffDays; i++) {
        //push to byDays array all the days the guest appear
        let newTmp = new Date(d.bookingFrom).setDate(new Date(d.bookingFrom).getDate() +i);
        if (new Date(newTmp).toDateString().replace(/ /g,"-") in byDate) {
          byDate[new Date(newTmp).toDateString().replace(/ /g,"-")].push(d);
        }
        else {
          byDate[new Date(newTmp).toDateString().replace(/ /g,"-")] = [];
          byDate[new Date(newTmp).toDateString().replace(/ /g,"-")].push(d);
        }
      }
    })
    this.setState({'byDate': byDate});
    console.log('byDate array',byDate)
  }

  componentWillReceiveProps(nextProps){
    this.currentDate = nextProps.date;
     if (this.props.data !== nextProps.data){
      this.buildDataByDate(nextProps.data)
    }
  }

  closeDrawer(){
    this.setState({'openDrawer': false});
  }

  componentWillMount(){
    if (this.props.data)
      this.buildDataByDate(this.props.data)
    this.currentDate = this.props.date;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() { 
    return (
      <div className="guest-health">
        <div className="title">GUEST HEALTH</div>
            {this.props.status === 'All' ?
             <div className="main-wrapper by-days">
             { Object.keys(this.state.byDate).map(key =>  
             <div className="wrapper-flex-colomn">
                <div className="wrapper-tags">
                {this.state.byDate[key].map((index,  key2) =>
                <div>
                  <Chip
                    label={`${index['guest'].firstName} ${index['guest'].lastName}`}
                    key={key}
                    onClick={() => this.handleChipClick(index)}
                    onDelete={this.handleChipClick}
                    className="chip"
                    deleteIcon={<img alt="" src={checkIn} />}
                  />
                </div>
                )}   
              </div>
              <div className="tag char">|</div>
              <div className="tag">{`${new Date(key).getDate()}/${new Date(key).getMonth()+1} `}
              {`${new Date(key).toDateString() === new Date(this.currentDate).toDateString() ? `TODAY`: ``}`}</div> 
             </div>
            
            )}
          </div>
          :  
          <div className="main-wrapper">
          <div className="wrapper-flex-colomn">
             <div className="wrapper-tags">
             {this.props.data.map((index,  key) =>
             <div>
               <Chip
                 label={`${index['guest'].firstName} ${index['guest'].lastName}`}
                 key={key}
                 onClick={() => this.handleChipClick(index)}
                 onDelete={this.handleChipClick}
                 className="chip"
                 deleteIcon={<img alt="" src={checkIn} />}
               />
             </div>
             )}   
           </div>
          </div>
         
       </div>
           }
        
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
