import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
//import './Dates.css';

class ClubMemberSection extends Component {
  constructor() {
    super();
    this.state = {
      clubMemberValue: '',
      hotelvalues: [],
    }
  }
  handleClubMemberChange = (event, index, value) => {
    this.setState({ clubMemberValue: value });
    this.props.updateRule({ key: 'clubMember', sign: 'equal', value, factProp: 'clubMember' });
  }

  render() {
    return (
      <div className="clubMemberSection">
        <div>
          <SelectField
            floatingLabelText="club member"
            value={this.state.clubMemberValue}
            onChange={this.handleClubMemberChange}
            >
            <MenuItem value={'irrelevant'} primaryText="irrelevant" />
            <MenuItem value={true} primaryText="yes" />
            <MenuItem value={false} primaryText="no" />
          </SelectField>
        </div>
      </div>
    );
  }
}

export default ClubMemberSection;