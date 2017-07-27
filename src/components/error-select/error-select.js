import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { gql, graphql } from 'react-apollo';

class ErrorSelect extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    }
  }
  componentWillReceiveProps(newProps) {
    if (!newProps.data.loading) {
      this.setState({ errors: newProps.data.roomErrors.ErrorsWeight })
    }
  }

  render() {
    return (
      <SelectField
        className="error-select"
        floatingLabelText="choose error"
        value={this.props.selectedError}
        onChange={this.props.handleErrorChange}
        >
        {Object.keys(this.state.errors).map((item, index) =>
          <MenuItem key={index} value={item} primaryText={item} />
        )}
      </SelectField>

    )

  }
}

const ErrorsQuery = gql`
  query getErrors {
    roomErrors
  }
`;

export default graphql(ErrorsQuery)(ErrorSelect)