import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './style.css';

export default class PushNotification extends React.Component {
  state = {

  }
  save = () => {
    this.props.loadComponent('RuleEditor', {type: 'newActionSaved', action: {type: 'push notification',message: this.state.message}})
    
  }
  changeMessage = (e, val) => {
    this.setState({ message: val })
  }
  render() {
    return (
      <div className="push-notification">
        <div className="field-wrapper">
          <span>ACTION</span>
          <span className="title">Send Push Notification</span>
        </div>
        <div className="field-wrapper">
          <span>ENTITY</span>
        </div>
        <div className="field-wrapper">
          <span>MESSAGE</span>
           <TextField
            className="message"
            underlineShow={false}
            multiLine={true}
            value={this.state.message}
            onChange={this.changeMessage}
            textareaStyle={{border: '1px solid #EDEDED'}}
            rows={4}
          />
        </div>
        <div className="bottom">
          <RaisedButton label="Save" onClick={this.save} />
        </div>
      </div>
    )
  }
}