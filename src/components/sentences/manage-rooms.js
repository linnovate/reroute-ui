import React, { Component } from 'react';
import update from 'react/lib/update';
import ContainerRooms from './container-rooms';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import HotelSelect from '../hotel-select/hotel-select';
import config from '../../config';


class ManageRooms extends Component {

  constructor() {
    super();
    this.state = {
      selectedHotel: '',
      selectedRooms: []
    }
  }

  moveRoom = (dragIndex, hoverIndex) => {
    const rooms = this.state.selectedRooms;
    const dragRoom = rooms[dragIndex];

    this.setState(update(this.state, {
      selectedRooms: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRoom],
        ],
      },
    }));
  }

  save = () => {
    axios.post(`${config.ruleServer}api/rooms`, { 
      rooms: this.state.selectedRooms
    })
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  updateHotel = (data) => {
    this.setState({ selectedHotel: data });
  }

  updateRooms = (data) => {
    if (!data) {
      this.setState({ selectedRooms: [] });
    } else {
      axios.get(`${config.ruleServer}api/rooms?hotelID=${this.state.selectedHotel}`, {
          params: {
            rooms: JSON.stringify(data),
          }
      })
        .then((response) => {
          this.setState({ selectedRooms: response.data });
      })
        .catch(function (error) {
          console.log(error);
      });
    }

  }

  render() {
    return (
      <div className="manage-rooms">
          <HotelSelect 
            selectedHotel={this.state.selectedHotel}
            updateHotel={this.updateHotel} 
            updateRooms={this.updateRooms} 
          />
          {this.state.selectedRooms.length > 0 && <div className="wrapper-rooms">
          <ContainerRooms 
            rooms={this.state.selectedRooms} 
            moveRoom={this.moveRoom} 
          />
          <RaisedButton label="SAVE" onTouchTap={this.save} />
          </div>}
      </div>
    )
  }
}

export default ManageRooms