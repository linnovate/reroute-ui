import React, { Component } from 'react';
import update from 'react/lib/update';
import Container from './container';
import RaisedButton from 'material-ui/RaisedButton';
import './manage-icons.css';

class ManageIcons extends Component {

  constructor() {
    super();
    this.state = {
      rooms: []
    }
  }

  componentWillMount() {
    this.setState({ rooms: this.props.rooms })
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

  save = () => {
    
  }

  render() {
    return (
      <div className="manage-icons">
      <Container rooms={this.state.rooms} moveRoom={this.moveRoom} icons={this.props.icons} />
      <RaisedButton label="SAVE" onTouchTap={this.save} />
      </div>
    )
  }
}

export default ManageIcons;