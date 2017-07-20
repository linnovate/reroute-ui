import React, { Component } from 'react';
import update from 'react/lib/update';
import ContainerRooms from './container-rooms';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import _ from 'lodash';
import CopyWeights from '../copy-weights/copy-weights';
import './manage-icons.css';

class ManageIcons extends Component {

  constructor() {
    super();
    this.state = {
      rooms: [],
      modalOpen: false
    }
  }

  componentWillMount() {
    this.setState({ rooms: this.props.rooms })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rooms !== nextProps.rooms) {
      this.setState({ rooms: nextProps.rooms })
    }
  }

  moveRoom = (dragIndex, hoverIndex) => {
    const { rooms } = this.state;
    const dragRoom = rooms[dragIndex];

    this.setState(update(this.state, {
      rooms: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRoom],
        ],
      },
    }));
  }

  handleIconDrop = (item, roomIndex) => {
    this.setState(update(this.state, {
      rooms: {
        [roomIndex]: {
          icons: {
            $push: [item],
          }
        }
      }
    }));

  }

  moveIcon = (dragIndex, hoverIndex, roomIndex) => {
    const icons = this.state.rooms[roomIndex].icons;
    const dragIcon = icons[dragIndex];

    this.setState(update(this.state, {
      rooms: {
        [roomIndex]: {
          icons: {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragIcon],
            ],
          }
        },
      }
    }));
  }

  save = () => {
    axios.post('http://localhost:4040/api/icons', { 
      rooms: this.state.rooms
    })
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  resetAllIcons = () => {
    const tmp = this.state.rooms
    _.forEach(tmp, (item) => {
      item.icons = [];
    })
    this.setState({ rooms: tmp });

  }

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  }

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  copyWeights = (pax) => {
    this.handleModalClose();
    axios.post('http://localhost:4040/api/icons/copy', { 
      hotelID: this.props.hotel,
      rooms: this.state.rooms,
      pax
    })
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="manage-icons">
        <ContainerRooms 
          rooms={this.state.rooms} 
          moveRoom={this.moveRoom} 
          icons={this.props.icons} 
          handleIconDrop={this.handleIconDrop}
          moveIcon={this.moveIcon}
        />
        <div className="actionBtn">
          <RaisedButton label="COPY WEIGTHS" onTouchTap={this.handleModalOpen} />
        </div>
        <div className="actionBtn">
          <RaisedButton label="RESET ALL ICONS" onTouchTap={this.resetAllIcons} />
        </div>
        <div className="actionBtn">
          <RaisedButton label="SAVE" onTouchTap={this.save} />
        </div>
        <CopyWeights 
          open={this.state.modalOpen}
          handleClose={this.handleModalClose}
          pax={this.props.pax}
          handleSubmit={this.copyWeights}
        />
      </div>
    )
  }
}

export default ManageIcons;