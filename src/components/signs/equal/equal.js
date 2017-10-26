import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
// import MenuItem from 'material-ui/MenuItem';

class EqualSign extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: this.props.currentRule.conditions[this.props.arrayIndex].key,
      value: this.props.currentRule.conditions[this.props.arrayIndex].value,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // handlePaxChange = (event, value) => {
  //   this.props.updateRule({ key: event.target.name, sign: 'equal', value, factProp: event.target.name });
  // }
  // handleLocalChange = (event, index, value) => {
  //   this.props.updateRule({ key: 'local', sign: 'equal', value, factProp: 'local' });
  // }

  // handleTypeChange = (event, index, type) => {
  //   this.setState({ type, });
  // }

  handleInputChange(event, newVal) {
    this.setState({
      [event.target.name]: newVal,
    });
    if (this.state.key && this.state.value) {
      this.props.updateRule('update', 'condition', { key: this.state.key, sign: 'equal', value: this.state.value, factProp: this.state.key, arrayIndex: this.props.arrayIndex });
    }
  }

  render() {
    return (
      <div className="equal-sign">
        <div>
          {/* <SelectField
          floatingLabelText="type"
          onChange={this.handleTypeChange}
          >
          <MenuItem value={'text'} primaryText="string" />
          <MenuItem value={'number'} primaryText="number" />
          <MenuItem value={'bool'} primaryText="bool" />
        </SelectField> */}
        </div>
        <div>
          <TextField value={this.state.key} name="key" floatingLabelText="Key" type="text" hintText="Key" onChange={this.handleInputChange} />
          <span className="sign">=</span>
          <TextField name="value" value={this.state.value} floatingLabelText="Value" type="text" hintText="Value" onChange={this.handleInputChange} />
        </div>

      </div>
    );
  }
}

EqualSign.propTypes = {
  updateRule: PropTypes.func.isRequired,
  currentRule: PropTypes.object.isRequired,
  arrayIndex: PropTypes.number.isRequired,
};

export default EqualSign;
