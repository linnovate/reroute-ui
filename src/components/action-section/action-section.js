import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';
//import './Dates.css';

class ActionSection extends Component {
  constructor() {
    super();
    this.state = {
      actions: [],
    }
  }
  componentWillReceiveProps(newProps) {
    if (!newProps.data.loading) {
      let arr = newProps.data.specialservice;
      const { selectedHotels } = newProps;
      const actions = _.filter(arr, function(n) {
        return selectedHotels.indexOf(n.hotelID) !== -1;
      });
      this.setState({ actions })
    }
  }

  handleActionChange = (event, index, value) => {
    this.props.updateRuleAction(value);
  }

  render() {
    return (
      <div className="actionSection">
        <div>
          <SelectField
            floatingLabelText="action"
            value={this.props.currentAction}
            onChange={this.handleActionChange}
            >
            {this.state.actions.map((item, index) =>
              <MenuItem key={index} value={item.specialServiceCode} primaryText={item.specialServiceCode} />
            )}
          </SelectField>
        </div>
      </div>
    );
  }
}

const getActions = gql`
  query getActions {
    specialservice {
      specialServiceCode
      hotelID
    }
  }
`;

export default graphql(getActions)(ActionSection)
