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
        byDate: {}
      };
      this.handleChipClick = this.handleChipClick.bind(this);
      this.buildData = this.buildData.bind(this);
      this.closeDrawer = this.closeDrawer.bind(this);
      this.currentDate = '';
      this.byDate = {};
  }

  handleChipClick(index){
    this.currentGuest = index;
    this.currentGuest.bookingFrom = moment(this.currentGuest.bookingFrom).format('MMMM Do YYYY');
    this.currentGuest.bookingTo = moment(this.currentGuest.bookingTo).format('MMMM Do YYYY');
    if (!this.currentGuest.roomNumber) this.currentGuest.roomNumber = '';
    this.setState({'openDrawer': true});
  }

  buildData(d, data, currentDate){
    let tmpDate = new Date(currentDate).setHours(0,0,0,0)
    if (new Date(d) >= new Date(tmpDate)) {
      if (new Date(d).toDateString().replace(/ /g,"-") in this.byDate) {
        this.byDate[new Date(d).toDateString().replace(/ /g,"-")].push(data);
      }
      else {
        this.byDate[new Date(d).toDateString().replace(/ /g,"-")] = [];
        this.byDate[new Date(d).toDateString().replace(/ /g,"-")].push(data);
      }
    }
  }

  buildDataByDate(data, currentDate){
    this.byDate = {};
    let that = this;
    data.forEach(function(d){
      var date1 = new Date(d.bookingFrom);
      var date2 = new Date(d.bookingTo);
      date1.setHours(0,0,0,0);
      date2.setHours(24,0,0,0);
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      that.buildData(d.bookingFrom, d, currentDate);
      let that2 = that;
      //push to byDays array all the days the guest appear
      for(let i = 1;i < diffDays; i++) {
        let newTmp = new Date(d.bookingFrom).setDate(new Date(d.bookingFrom).getDate() +i);
        that2.buildData(newTmp, d, currentDate);
      }
    })
    this.setState({'byDate': this.byDate});
  }

  componentWillReceiveProps(nextProps){
    this.currentDate = nextProps.date;
     if (this.props.data !== nextProps.data){
      this.buildDataByDate(nextProps.data, nextProps.date)
    }
  }

  closeDrawer(){
    this.setState({'openDrawer': false});
  }

  componentWillMount(){
    if (this.props.data)
      this.buildDataByDate(this.props.data, this.props.date)
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
