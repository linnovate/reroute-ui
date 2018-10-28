import React from 'react';
import Chip from '@material-ui/core/Chip';
import Drawer from '@material-ui/core/Drawer';
import DrawerProfile from './../DrawerProfile';

import checkIn from './../../assets/img/checkIn.svg'


import './GuestHealth.scss';

class GuestHealth extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        openDrawer: false
      };
      this.handleChipClick = this.handleChipClick.bind(this);
      this.closeDrawer = this.closeDrawer.bind(this);
  }

  handleChipClick(){
    this.setState({'openDrawer': true});
  }

  closeDrawer(){
    this.setState({'openDrawer': false});
  }

   
  render() {
      let numbers = [1,2,3,4,5,6,7,8,9,0,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
      return (
      <div className="guest-health">
        <div className="title">GUEST HEALTH</div>
        <div className="by-days">
          {numbers.map((index,  key) =>
            <div className="wrapper-tags">
              {numbers.map((index,  key) =>
                <Chip
                  label={`HARON GRAAM ${index}`}
                  key={index}
                  onClick={this.handleChipClick}
                  onDelete={this.handleChipClick}
                  className="chip"
                  deleteIcon={<img alt="" src={checkIn} />}
                  />
                )}
                <div className="tag char">|</div>
                <div className="tag">1/6 today</div>
            </div>
          )}
         </div>
        <Drawer anchor="right" open={this.state.openDrawer} >
          <div
            tabIndex={0}
            role="button"
          >
           <DrawerProfile closeDrawer={this.closeDrawer}></DrawerProfile>
          </div>
        </Drawer>
     </div>
    )
  }
}

export default GuestHealth;
