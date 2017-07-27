import React, { Component } from 'react';
import RoomSortable from './room-sortable';


class ContainerRooms extends Component {

  render() {
    const { rooms } = this.props;

    return (
      <div className="container">
        <div className="rooms">
        {rooms.map((room, i) => (
          <RoomSortable
            key={room._id}
            index={i}
            id={room._id}
            room={room}
            moveRoom={this.props.moveRoom}
          />
        ))}
        </div>
      </div>
    );
  }
}

export default ContainerRooms