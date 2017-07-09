import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
//import './Dates.css';

class PaxSection extends Component {
  constructor() {
    super();
    this.state = {
      localValue: ''
    }
  }
  handlePaxChange = (event, value) => {
    this.props.updateRule({ key: event.target.name, sign: 'equal', value, factProp: event.target.name });
  }
  handleLocalChange = (event, index, value) => {
    this.setState({ localValue: value });
    this.props.updateRule({ key: 'local', sign: 'equal', value, factProp: 'local' });
  }

  render() {
    return (
      <div className="PaxSection">
        <div>
          <TextField name="adults" floatingLabelText="Adults" type="number" hintText="Adults" onChange={this.handlePaxChange} />
        </div>
        <div>
          <TextField name="children" floatingLabelText="Children" type="number" hintText="Children" onChange={this.handlePaxChange}/>
        </div>
        <div>
          <TextField name="infants" floatingLabelText="Infants" type="number" hintText="Infants" onChange={this.handlePaxChange}/>
        </div>
        <div>
          <SelectField
            floatingLabelText="local"
            value={this.state.localValue}
            onChange={this.handleLocalChange}
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

export default PaxSection;