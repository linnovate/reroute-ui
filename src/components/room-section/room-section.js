import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { gql, graphql } from 'react-apollo';
//import './Dates.css';

class RoomSection extends Component {
  constructor() {
    super();
    this.state = {
      roomCategoryValues: [],
      rooms: []
    }
  }

  componentWillReceiveProps(newProps) {
    if( !newProps.data.loading) {
      this.setState({ rooms: newProps.data.rooms })
    }
  }
  handleHotelsChange = (event, index, values) => this.setState({ roomCategoryValues: values });
  
  menuItems(values) {
    return this.state.rooms.map((room) => (
      <MenuItem
        key={room.roomCategory}
        insetChildren={true}
        checked={values && values.indexOf(room.roomCategory) > -1}
        value={room.roomCategory}
        primaryText={room.roomCategory}
      />
    ));
  }

  render() {
    return (
      <div className="roomSection">
        <div>
          <SelectField
            multiple={true}
            hintText="Select a room"
            value={this.state.roomCategoryValues}
            onChange={this.handleHotelsChange}
          >
            {this.menuItems(this.state.roomCategoryValues)}
          </SelectField>
        </div>
      </div>
    );
  }
}

const RoomQuery = gql`
  query getRooms($hotelID: ID) {
    rooms(hotelID: $hotelID) {
      roomCategory
    }  
  }
`;

export default graphql(RoomQuery, {
  options: ({ hotelID }) => ({ variables: { hotelID: hotelID }}),
})(RoomSection)

