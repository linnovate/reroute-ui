import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class Webhook extends Component {
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

  render() {

    return (
      <div className="webhook">
        <TextField name="url" value={this.state.url}  floatingLabelText="Url" type="text" hintText="Url" onChange={this.handleInputChange} />
        <RadioButtonGroup name="method" defaultSelected={this.state.method} onChange={this.handleInputChange}>
          <RadioButton
            value="POST"
            label="POST"
          />
          <RadioButton
            value="PUT"
            label="PUT"
          />
        </RadioButtonGroup>
      </div>
    );
  }
}

Webhook.propTypes = {
  data: PropTypes.object.isRequired,
  updateActionData: PropTypes.func.isRequired,
};

export default Webhook;
