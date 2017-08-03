import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class RoomSection extends Component {

  handleRoomsChange = (event, index, values) => {
    this.props.updateRule({ key: 'room', sign: 'in array', value: values, factProp: 'room' });
  }
  
  menuItems(values) {
    return this.props.roomsByHotel.map((room) => (
      <MenuItem
        key={`${room.hotelID}-${room.roomCategory}`}
        insetChildren={true}
        checked={values && values.indexOf(`${room.hotelID}-${room.roomCategory}`) > -1}
        value={`${room.hotelID}-${room.roomCategory}`}
        primaryText={`${room.hotelName} - ${room.name}`}
      />
    ));
  }

  handlePlancodeChange = (event, index, value) => {
    this.props.updateRule({ key: 'plancode', sign: 'equal', value, factProp: 'plancode' });
  }

  render() {
    return (
      <div className="roomSection">
        <div>
          <SelectField
            multiple={true}
            hintText="Select a room"
            value={this.props.currentRule.room.value}
            onChange={this.handleRoomsChange}
          >
            {this.menuItems(this.props.currentRule.room.value)}
          </SelectField>
        </div>
        <div>
          <SelectField
            floatingLabelText="plancode"
            value={this.props.currentRule.plancode.value}
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

