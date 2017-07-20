import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import RoomSortable from './room-sortable';
import IconDraggable from './icon-draggable';


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
            handleIconDrop={(item) => this.props.handleIconDrop(item, i)}
            moveIcon={(dragIndex, hoverIndex) => this.props.moveIcon(dragIndex, hoverIndex, i)}
          />
        ))}
        </div>
        <div className="icons">
        {this.props.icons.map((icon, index) =>
            <IconDraggable key={index} data={icon} />
        )}
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(ContainerRooms)