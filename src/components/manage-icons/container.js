import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './card';
import Box from './box';


class Container extends Component {

  render() {
    const { rooms } = this.props;

    return (
      <div className="container">
        <div className="rooms">
        {rooms.map((room, i) => (
          <Card
            key={room._id}
            index={i}
            id={room._id}
            text={room.roomName}
            moveCard={this.props.moveRoom}
          />
        ))}
        </div>
        <div className="icons">
        {this.props.icons.map((icon, index) =>
            <Box key={index} data={icon} />
        )}
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Container)