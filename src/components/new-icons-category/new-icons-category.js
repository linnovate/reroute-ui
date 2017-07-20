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
      pax: []
    }
  }

  componentWillMount() {
      axios.get(`http://localhost:4040/api/icons/pax`)
      .then((response) => {
        this.setState({ pax: response.data })
      })
      .catch(function (error) {
        console.log(error);
      });
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
      description__value
  }
  }
`;

export default graphql(HotelsQuery)(NewIconsCategory)