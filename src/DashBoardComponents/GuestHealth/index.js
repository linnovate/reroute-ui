import React from 'react';
import Chip from '@material-ui/core/Chip';
import Drawer from '@material-ui/core/Drawer';
import DrawerProfile from './../DrawerProfile';
import DATA from '../data';


import './GuestHealth.scss';

class GuestHealth extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        openDrawer: false,
        data: [],
        currentMasterId: null,
        byDate: {},
      };
      this.handleChipClick = this.handleChipClick.bind(this);
      this.buildData = this.buildData.bind(this);
      this.closeDrawer = this.closeDrawer.bind(this);
      this.currentDate = '';
  }

  //real code:
  // container(taskID: "${bookID}") {

  loadResults(bookID, callback){
    const query = `{
      container(taskID: "5bd6c2a300e97029f891c54f") {
          container {
            title
            description
          }
          actionsList {
            title
            description
        }
       }
      }`;
    new DATA('post', query).then(res => {
      callback(res.data.data.container);
    }),function(err) {
      console.log('err',err);
   }
  }

  handleChipClick(index){
    console.log('index',index);
    this.props.onMarkThisGuest(index.masterID);
    this.currentGuest = index;
    let that = this;
    this.loadResults(index.bookID, function(data){
      that.currentGuest.containers =  data;
      that.setState({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        'openDrawer': true,
        'currentMasterId': index.masterID
      });
    },function error(err){
     console.log(err);
    });
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

  buildDataByDate(data, currentDate, range, status){
    this.byDate = {};
    let that = this;
    data.forEach(function(d){
      var date1 = new Date(d.bookingFrom);
      var date2 = new Date(d.bookingTo);
      date1.setHours(0,0,0,0);
      date2.setHours(24,0,0,0);
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (status === 'CheckOut')
        that.buildData(d.bookingTo, d, currentDate);
      else that.buildData(d.bookingFrom, d, currentDate);
      // push to byDays array all the days the guest appear
      if (status === 'All') {
        let thatFunc = that;
        for ( let i = 1;i < diffDays; i++ ) {
          let newTmp = new Date(d.bookingFrom).setDate(new Date(d.bookingFrom).getDate() + i);
          let tmpRange = new Date(currentDate);
          tmpRange = tmpRange.setDate(tmpRange.getDate() + range);
          if (newTmp <= tmpRange) {
            thatFunc.buildData(new Date(newTmp).toDateString(), d, currentDate);
          }                         
        }
      }
    })
    this.setState({'byDate': this.byDate});
    console.log('bydate',this.byDate)
  }

  componentWillReceiveProps(nextProps){
    this.currentDate = nextProps.date;
     if (this.props.data !== nextProps.data  || this.props.date !== nextProps.date || this.props.status !== nextProps.status){
      this.buildDataByDate(nextProps.data, nextProps.date, nextProps.range, nextProps.status);
    }
  }

  closeDrawer(){
    this.setState({
      'openDrawer': false,
      'currentMasterId': null
    });
    this.props.onMarkThisGuest(null);
  };

  componentWillMount(){
    // if (this.props.data)
    //   this.buildDataByDate(this.props.data, this.props.date,  this.props.range)
    // this.currentDate = this.props.date;
  };

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  };

  renderLabel(index){
    return <div>
      <p>{index['guest'].firstName} {index['guest'].lastName}</p>
      {index.roomNumber ? 
        <p>{`room no: ${index.roomNumber}`}</p> :
        <p>{`book no: ${index.masterID}`}</p> 
      }
    </div>
  };

  render() {
    return (
      <div className="guest-health">
        <div className="title">GUEST HEALTH</div>
             <div className="main-wrapper by-days">
             { Object.keys(this.state.byDate).map(key => 
             <div key={key} className="wrapper-flex-colomn">
                <div className="wrapper-tags">
                {this.state.byDate[key].map((index,  key2) =>
                <div key={key2}>
                  <Chip
                    label={this.renderLabel(index)}
                    onClick={() => this.handleChipClick(index)}
                    className={`chip ${index.masterID === this.state.currentMasterId ? 'selected': ''}`}
                  ></Chip>
                </div>
                )}   
              </div>
              <div className="tag char">|</div>
              <div className="tag">{`${new Date(key).getDate()}/${new Date(key).getMonth()+1} `}
              {`${new Date(key).toDateString() === new Date().toDateString() ? `TODAY`: ``}`}</div> 
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
