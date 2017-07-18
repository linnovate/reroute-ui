import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { gql, graphql } from 'react-apollo';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import _ from 'lodash';
import ManageIcons from '../manage-icons/manage-icons';

import './new-icons-category.css';

class NewIconsCategory extends Component {
  constructor() {
    super();
    this.state = {
      hotelValue: '',
      hotels: [],
      paxValue: '',
      icons: [],
      rooms: [],
    }
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.data.loading) {
      this.setState({ hotels: newProps.data.hotels, icons: newProps.data.encourageSales })
    }
  }
  handleHotelChange = (event, index, value) => {
    this.setState({ hotelValue: value})
  }

  handlePaxChange = (event, index, value) => {
    this.setState({ paxValue: value})
  }

  handleManageBtn = () => {
      const hotel = _.find(this.state.hotels, (o) => o.hotelID === this.state.hotelValue);

      axios.get(`http://localhost:4040/api/icons?hotelID=${hotel.hotelID}&pax=${this.state.paxValue}`, {
        params: {
          rooms: JSON.stringify(hotel.room),
          icons: JSON.stringify(this.state.icons)
        }
      })
      .then((response) => {
        this.setState({ rooms: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <SelectField
          className="hotel-select"
          floatingLabelText="choose hotel"
          value={this.state.hotelValue}
          onChange={this.handleHotelChange}
          >
          {this.state.hotels.map((item, index) => 
            <MenuItem key={index} value={item.hotelID} primaryText={item.name} />     
          )}
        </SelectField>
        <SelectField
          floatingLabelText="choose pax"
          value={this.state.paxValue}
          onChange={this.handlePaxChange}
          >
            <MenuItem value="single" primaryText="Single" />
            <MenuItem value="double" primaryText="Double" />
            <MenuItem value="moreThan2" primaryText="More Than 2" />
            <MenuItem value="family" primaryText="Family" />
            <MenuItem value="withBabies" primaryText="With Babies" /> 
        </SelectField>
        <div>
          <RaisedButton label="Manage" disabled={this.state.hotelValue === '' || this.state.paxValue === ''} onTouchTap={this.handleManageBtn} />
        </div>
        <Divider />
        {this.state.rooms.length > 0 && <ManageIcons rooms={this.state.rooms} icons={this.state.icons} />}
      </div>
    )
  }
}

const HotelsQuery = gql`
  query getData {
    hotels {
      hotelID
      name
      room {
        roomCategory
        name
      }
    }
    encourageSales(language: "eng") {
      name
      field_icon
  }
  }
`;

export default graphql(HotelsQuery)(NewIconsCategory)