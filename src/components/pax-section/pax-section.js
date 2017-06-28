import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
//import './Dates.css';

class PaxSection extends Component {
  constructor() {
    super();
    this.state = {
      paxValue: '',
      infantsValue: '',
      nationalityValue: ''
    }
  }
  handlePaxChange = (event, index, value) => {
    this.setState({ paxValue: value });
    this.props.updateRule({ key: 'pax', sign: 'equal', value, factProp: 'pax' });
  }
  handleInfantsChange = (event, index, value) => {
    this.setState({ infantsValue: value });
    this.props.updateRule({ key: 'infants', sign: 'equal', value, factProp: 'infants' });
  }
  handleNationalityChange = (event, index, value) => {
    this.setState({ nationalityValue: value });
    this.props.updateRule({ key: 'nationality', sign: 'equal', value, factProp: 'nationality' });
  }

  render() {
    return (
      <div className="PaxSection">
        <div>
          <SelectField
            floatingLabelText="pax"
            value={this.state.paxValue}
            onChange={this.handlePaxChange}
            >
            <MenuItem value={'irrelevant'} primaryText="irrelevant" />
            <MenuItem value={'alone'} primaryText="alone" />
            <MenuItem value={'couple'} primaryText="couple" />
            <MenuItem value={'family'} primaryText="family" />
          </SelectField>
        </div>
        <div>
          <SelectField
            floatingLabelText="infants"
            value={this.state.infantsValue}
            onChange={this.handleInfantsChange}
            >
            <MenuItem value={'irrelevant'} primaryText="irrelevant" />
            <MenuItem value={true} primaryText="yes" />
            <MenuItem value={false} primaryText="no" />
          </SelectField>
        </div>
        <div>
          <SelectField
            floatingLabelText="nationality"
            value={this.state.nationalityValue}
            onChange={this.handleNationalityChange}
            >
            <MenuItem value={'irrelevant'} primaryText="irrelevant" />
            <MenuItem value={'hebrew'} primaryText="hebrew" />
            <MenuItem value={'tourist'} primaryText="tourist" />
          </SelectField>
        </div>
      </div>
    );
  }
}

export default PaxSection;