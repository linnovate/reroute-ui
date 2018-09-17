import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import AddBtn from '../add-btn/add-btn';
import './style.css'

class Actions extends React.Component {
  showList = (event) => {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }
  state = {
    anchorEl: null,
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleChange = (event, index, value) => this.setState({value});
  render() {
    console.log(this.props.actions)
    return (
      <div className={`actions ${this.state.showList ? 'showList' : ''}`}>
      {this.props.actions && this.props.actions.map((item) => <div>{item.type}</div>)}
        <AddBtn handleClick={this.showList}/>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Send push notification" onClick={() => this.props.loadComponent('PushNotification', {type: 'editPushNotification'})}/>
            <MenuItem primaryText="Update guest health" />
            <MenuItem primaryText="Add tag to guest" />
          </Menu>
        </Popover>
      </div>
    )
  }
}

export default Actions