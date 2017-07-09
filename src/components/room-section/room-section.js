import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { gql, graphql } from 'react-apollo';
import _ from 'lodash';
//import './Dates.css';

class RoomSection extends Component {
  constructor() {
    super();
    this.state = {
      roomCategoryValues: [],
      rooms: [],
      plancodeValue: ''
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.selectedHotels !== this.props.selectedHotels) {
      let rooms = []
      _.forEach(newProps.selectedHotels, (value) => {
        const hotel = _.find(this.props.hotels, {hotelID: value});
        const tmp1 = _.filter(hotel.room,o => o.name !== '');
        const tmp2 = tmp1.map(item => ({hotelID: hotel.hotelID, hotelName: hotel.name, roomName: item.name, roomCategory: item.roomCategory}));
         rooms = _.concat(rooms, tmp2);
      });
       this.setState({rooms})
    }
  }
  handleRoomsChange = (event, index, values) => {
    this.setState({ roomCategoryValues: values });
    this.props.updateRule({ key: 'room', sign: 'in array', value: values, factProp: 'room' });
  }
  
  menuItems(values) {
    return this.state.rooms.map((room) => (
      <MenuItem
        key={`${room.hotelID}-${room.roomCategory}`}
        insetChildren={true}
        checked={values && values.indexOf(`${room.hotelID}-${room.roomCategory}`) > -1}
        value={`${room.hotelID}-${room.roomCategory}`}
        primaryText={`${room.hotelName} - ${room.roomName}`}
      />
    ));
  }

  handlePlancodeChange = (event, index, value) => {
    this.setState({ plancodeValue: value });
    this.props.updateRule({ key: 'plancode', sign: 'equal', value, factProp: 'plancode' });
  }

  render() {
    return (
      <div className="roomSection">
        <div>
          <SelectField
            multiple={true}
            hintText="Select a room"
            value={this.state.roomCategoryValues}
            onChange={this.handleRoomsChange}
          >
            {this.menuItems(this.state.roomCategoryValues)}
          </SelectField>
        </div>
        <div>
          <SelectField
            floatingLabelText="plancode"
            value={this.state.plancodeValue}
            onChange={this.handlePlancodeChange}
            >
            <MenuItem value={'irrelevant'} primaryText="irrelevant" />
            <MenuItem value={'RO'} primaryText="RO" />
            <MenuItem value={'B/B'} primaryText="B/B" />
            <MenuItem value={'BBTR'} primaryText="BBTR" />
            <MenuItem value={'H/B'} primaryText="H/B" />
            <MenuItem value={'HBTR'} primaryText="HBTR" />
            <MenuItem value={'F/B'} primaryText="F/B" />
            <MenuItem value={'FBTR'} primaryText="FBTR" />
          </SelectField>
        </div>
      </div>
    );
  }
}

export default RoomSection;

