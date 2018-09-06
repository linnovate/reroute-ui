import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import './style.css';

class Delay extends Component {
  constructor(props) {
    super(props);
    this.state = {
        url: this.props.data.url || '',
        method: this.props.data.method || 'POST',
        data: this.props.data
    }
  }

  handleInputChange = (event, newVal) => {
    this.setState({
      [event.target.name]: newVal,
    });
    this.props.updateActionData({[event.target.name]: newVal});
  }
  handleActionChange = (event, index, value) => {
    this.setState({ afterDelay: value });
    this.props.updateActionData({afterDelay: value});
  }

  render() {

    return (
      <div className="delay">
        <TextField name="time" value={this.state.time}  floatingLabelText="minutes of delay" type="text" hintText="minutes of delay" onChange={this.handleInputChange} />
        <TextField name="waitFor" value={this.state.waitFor}  floatingLabelText="wait for" type="text" hintText="wait for" onChange={this.handleInputChange} />
        <SelectField
        floatingLabelText="after delay"
        onChange={this.handleActionChange}
        value={this.state.afterDelay}
        >
        {['email'].map((item, index) =>
            <MenuItem key={index} value={item} primaryText={item} />,
        )}
        </SelectField>
      </div>
    );
  }
}

Delay.propTypes = {
  data: PropTypes.object.isRequired,
  updateActionData: PropTypes.func.isRequired,
};

export default Delay;
