import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import profile from '../../assets/img/profile.svg';
import close from '../../assets/img/close.svg';

import './DrawerProfile.scss';

class DrawerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        openDrawer: false,
        value : 0
    };
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  closeDrawer(){
      this.props.closeDrawer();
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div className="profile">
       <div className="close" onClick={() => this.closeDrawer()} style={{ backgroundImage: `url(${close})` }}></div>
       <div className="details">
        <Avatar
          alt="Adelle Charles"
          src={profile}
          className="avatar"
        />
        <div>
          <div className="name">Mr. Howard Romero</div>
          <div className="index">48015134155</div>
        </div>
       </div>
       <div className="roomDetails">
         <div className="detail">
           <div className="icon one">check-in</div>
           <span>May 1st 2018</span>
         </div>
         <div className="detail">
           <div className="icon two">check-out</div>
           <span>Standard  201</span>
         </div>
         <div className="detail">
           <div className="icon three">room</div>
           <span>May 4th 2018</span>
         </div>
         <div className="detail">
           <div className="icon four">guests</div>
           <span>2 Adults   3 Children</span>
         </div>
       </div>
       <Tabs
            className="tabs"
            value={this.state.value}
            onChange={this.handleTabChange}
          >
            <Tab className="tab" value={0} label="CheckList" />
            <Tab className="tab" value={1} label="Alerts" />
          </Tabs>
          {this.state.value === 0 && 
          <div className="list">
            <div className="green">Reservation Created</div>
            <div className="red">Reservation connected to App</div>
            <div className="gray">Credit Card authorized</div>
            <div className="green">Key Issue</div>
            <div className="green">Reservation Created</div>
          </div>}
          {this.state.value === 1 && <div>Item Two</div>}
      </div>
    )
  }
}

export default DrawerProfile;
