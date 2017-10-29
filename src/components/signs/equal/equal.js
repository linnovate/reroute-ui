import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
// import MenuItem from 'material-ui/MenuItem';

class EqualSign extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataKey: this.props.currentRule.conditions[this.props.arrayIndex].key,
      dataValue: this.props.currentRule.conditions[this.props.arrayIndex].value,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentRule.updateExistingValues) {
      this.setState({
        dataKey: nextProps.currentRule.conditions[nextProps.arrayIndex].key,
        dataValue: nextProps.currentRule.conditions[nextProps.arrayIndex].value,
      });
    }
  }

  handleInputChange(event, newVal) {
    this.setState({
      [event.target.name]: newVal,
    }, function afterValuesChange() {
      this.props.updateRule('update', 'condition', { key: this.state.dataKey, sign: 'equal', value: this.state.dataValue, factProp: this.state.dataKey, arrayIndex: this.props.arrayIndex });
    });
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
          <TextField name="dataKey" value={this.state.dataKey}  floatingLabelText="Key" type="text" hintText="Key" onChange={this.handleInputChange} />
          <span className="sign">=</span>
          <TextField name="dataValue" value={this.state.dataValue} floatingLabelText="Value" type="text" hintText="Value" onChange={this.handleInputChange} />
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
