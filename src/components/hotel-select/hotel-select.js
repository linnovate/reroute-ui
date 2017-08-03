import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { gql, graphql, withApollo } from 'react-apollo';
import _ from 'lodash';

class HotelSelect extends Component {
  constructor() {
    super();
    this.state = {
      hotels: [],
      roomsForMultiple: []
    }
  }
  componentWillReceiveProps(newProps) {
    if (!newProps.data.loading) {
      this.setState({ hotels: newProps.data.hotels })
    }
  }

  menuItems(values) {
    return this.state.hotels.map((hotel) => (
      <MenuItem
        key={hotel.hotelID}
        insetChildren={true}
        checked={values && values.indexOf(hotel.hotelID) > -1}
        value={hotel.hotelID}
        primaryText={`${hotel.hotelID} - ${hotel.name}`}
        />
    ));
  }

  renderItems = (values) => {
    if (this.props.multiple) {
      return this.state.hotels.map((hotel) =>
        <MenuItem
          key={hotel.hotelID}
          insetChildren={true}
          checked={values && values.indexOf(hotel.hotelID) > -1}
          value={hotel.hotelID}
          primaryText={`${hotel.hotelID} - ${hotel.name}`}
          />
      );
    } else {
      return this.state.hotels.map((item, index) =>
        <MenuItem key={index} value={item.hotelID} primaryText={item.name} />
      );
    }

  }

  handleHotelChange = (event, index, value) => {
    this.props.updateHotel(value);
    this.props.client.query({
      query: gql`
        query getData($hotelID: ID, $language: ID) {
          rooms(hotelID: $hotelID, language: $language) {
            hotelID
            roomCategory
            name
          }
        }
      `,
      variables: { hotelID: this.props.multiple ? "" : value, language: "eng" },
    }).then(res => {
      if (!this.props.multiple) {
        this.props.updateRooms(res.data.rooms);
      } else {
        const hotelsNames = {};
        _.forEach(value, w => {
          const hotel = _.find(this.state.hotels, q => q.hotelID === w);
          hotelsNames[w] = hotel.name
        })
        const rooms = [];
        _.forEach(res.data.rooms, q => {
          const hotel = _.find(value, w => w === q.hotelID);
          if (hotel && q.name !== "") rooms.push({ ...q, hotelName: hotelsNames[q.hotelID] });
        })
        this.props.updateRooms(_.sortBy(rooms, (o) => o.hotelID));
      }
    });
  }

  render() {
    return (
      <SelectField
        multiple={this.props.multiple}
        className="hotel-select"
        floatingLabelText="choose hotel"
        value={this.props.selectedHotel}
        onChange={this.handleHotelChange}
        >
        {this.renderItems(this.props.selectedHotel)}
      </SelectField>
    )
  }
}

const HotelsQuery = gql`
  query getData {
    hotels {
      hotelID
      name
    }
  }
`;

HotelSelect = withApollo(HotelSelect);

export default graphql(HotelsQuery)(HotelSelect)