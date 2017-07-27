import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { gql, graphql, withApollo } from 'react-apollo';

class HotelSelect extends Component {
  constructor() {
    super();
    this.state = {
      hotels: []
    }
  }
  componentWillReceiveProps(newProps) {
    if (!newProps.data.loading) {
      this.setState({ hotels: newProps.data.hotels })
    }
  }

  handleHotelChange = (event, index, value) => {
    this.props.updateHotel(value);
    this.props.client.query({
      query: gql`
        query getData($hotelID: ID) {
          rooms(hotelID: $hotelID) {
            hotelID
            roomCategory
            name
          }
        }
      `,
      variables: { hotelID: value },
    }).then(res => {
      this.props.updateRooms(res.data.rooms);
    });
  }

  render() {
    return (
      <SelectField
        className="hotel-select"
        floatingLabelText="choose hotel"
        value={this.props.selectedHotel}
        onChange={this.handleHotelChange}
        >
        {this.state.hotels.map((item, index) =>
          <MenuItem key={index} value={item.hotelID} primaryText={item.name} />
        )}
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