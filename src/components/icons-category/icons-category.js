import React, { Component } from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import { gql, graphql } from 'react-apollo';
import config from '../../config';

import './icons-category.css';

class IconsCategory extends Component {
  constructor() {
    super();
    this.state = {
        iconsMatrixRooms: [[]],
        iconsMatrixSuites: [[]],
        popoverOpen: false,
    }

  }


  combinations(rooms) {
    const r = [];
    for(let i = 0; i < (1 << rooms.length); i++) {
      const c = [];
      for(let j = 0; j < rooms.length; j++) {
          const obj = {
              pos: { x: i, y: j },
              state: i & (1 << j),
              icon: 'eeee',
              room: rooms[j].name
          }
        c.push(obj);  
      }
      r.push(c);
    }
    return r;  
  }

  divideToRoomsSuites(roomsArr) {
    const rooms = [];
    const suites = [];
    roomsArr.forEach((value) => {
      if(value.name.indexOf('Suite') > -1)  suites.push(value);
      else if (value.name !== "") rooms.push(value);
    });
    return {rooms, suites};

  }

  componentWillReceiveProps(newProps) {
    if( !newProps.data.loading) {
      const data = this.divideToRoomsSuites(newProps.data.rooms);
      axios.get(`${config.ruleServer}api/icons/${this.props.hotelID}`, {
        params: {
          rooms: JSON.stringify(data.rooms),
          suites: JSON.stringify(data.suites)
        }
      })
      .then((response) => {
        this.setState({ 
          iconsMatrixRooms: response.data.iconsMatrix.roomMatrix.matrix,
          iconsMatrixSuites: response.data.iconsMatrix.suiteMatrix.matrix
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }


  handleIconTileClicked(event) {
    this.setState({
      popoverOpen: true,
      anchorEl: event.currentTarget,
    });
  }

   handleRequestClose = () => {
    this.setState({
      popoverOpen: false,
    });
  };

  render() {
    return (
      <div className="icons-category">
        icons
        <div className="icons-matrix">
        {this.state.iconsMatrixRooms.map((outer, outerIndex) =>
            <div className="col" key={outerIndex}>
            {outer.map((inner, innerIndex) =>
                <div className={`tile icons-tile ${inner.state ? 'active' : ''}`} key={innerIndex} onClick={(event) => this.handleIconTileClicked(event)}>
                    <span>{inner.icon}</span>
                </div>
            )}
            </div>
        )}
        <div className="col room-names">
            {this.state.iconsMatrixRooms[0].map((item, index) => 
                <div className="tile room-name-tile" key={index}>
                    <span>{item.room}</span>
                </div>
            )}
        </div>
        </div>
        <div className="icons-matrix">
        {this.state.iconsMatrixSuites.map((outer, outerIndex) =>
            <div className="col" key={outerIndex}>
            {outer.map((inner, innerIndex) =>
                <div className={`tile icons-tile ${inner.state ? 'active' : ''}`} key={innerIndex} onClick={(event) => this.handleIconTileClicked(event)}>
                    <span>{inner.icon}</span>
                </div>
            )}
            </div>
        )}
        <div className="col room-names">
            {this.state.iconsMatrixSuites[0].map((item, index) => 
                <div className="tile room-name-tile" key={index}>
                    <span>{item.room}</span>
                </div>
            )}
        </div>
        </div>
        <Popover
          open={this.state.popoverOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help &amp; feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Sign out" />
          </Menu>
        </Popover>
      </div>
    );
  }
}

const CurrentHotelForMatrix = gql`
  query getRooms($hotelID: ID) {
    rooms(hotelID: $hotelID) {
      name
    }
  }
`;

export default graphql(CurrentHotelForMatrix, {
  options: ({ hotelID }) => ({ variables: {hotelID: hotelID } }),
})(IconsCategory)
