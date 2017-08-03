import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { gql, graphql } from 'react-apollo';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import ManageIcons from '../manage-icons/manage-icons';
import HotelSelect from '../hotel-select/hotel-select';
import config from '../../config';

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
      pax: [],
      roomsByHotel: []
    }
  }

  componentWillMount() {
      axios.get(`${config.ruleServer}api/icons/pax`)
      .then((response) => {
        this.setState({ pax: response.data })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.data.loading) {
      this.setState({ icons: newProps.data.encourageSales })
    }
  }

  handlePaxChange = (event, index, value) => {
    this.setState({ paxValue: value})
  }

  handleManageBtn = () => {
    axios.get(`${config.ruleServer}api/icons?hotelID=${this.state.hotelValue}&pax=${this.state.paxValue}`, {
      params: {
        rooms: JSON.stringify(this.state.roomsByHotel),
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

  updateHotel = (data) => {
    this.setState({ hotelValue: data });
  }

  updateRooms = (data) => {
    this.setState({ roomsByHotel: data || [] });
  }

  render() {
    return (
      <div>
        <HotelSelect 
          selectedHotel={this.state.hotelValue}
          updateHotel={this.updateHotel} 
          updateRooms={this.updateRooms} 
        />
        <SelectField
          floatingLabelText="choose pax"
          value={this.state.paxValue}
          onChange={this.handlePaxChange}
          >
          {this.state.pax.map((item, index) => 
            <MenuItem key={index} value={item} primaryText={item} />
          )}
        </SelectField>
        <div>
          <RaisedButton label="Manage" disabled={this.state.hotelValue === '' || this.state.paxValue === ''} onTouchTap={this.handleManageBtn} />
        </div>
        <Divider />
        {this.state.rooms.length > 0 && <ManageIcons hotel={this.state.hotelValue} pax={this.state.pax} rooms={this.state.rooms} icons={this.state.icons} />}
      </div>
    )
  }
}

const IconsQuery = gql`
  query getData {
    encourageSales(language: "eng") {
      name
      field_icon
      description__value
  }
  }
`;

export default graphql(IconsQuery)(NewIconsCategory)