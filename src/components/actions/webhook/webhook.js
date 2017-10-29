import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';


class Webhook extends Component {
  constructor(props) {
    super(props);
    this.state = {
        url: this.props.data.url || '',
        data: this.props.data
    }
  }

  handleInputChange = (event, newVal) => {
    this.setState({
      [event.target.name]: newVal,
    });
    this.props.updateActionData({url: newVal});
  }

  render() {

    return (
      <div className="webhook">
        <TextField name="url" value={this.state.url}  floatingLabelText="Url" type="text" hintText="Url" onChange={this.handleInputChange} />
      </div>
    );
  }
}

Webhook.propTypes = {
  data: PropTypes.object.isRequired,
  updateActionData: PropTypes.func.isRequired,
};

export default Webhook;
