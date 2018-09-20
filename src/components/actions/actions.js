import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import _ from 'lodash';
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
    list: this.props.actionsOptions,
    actions: []
  };

  componentWillReceiveProps(nextprops) {
    this.setState({list: nextprops.actionsOptions || []})
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleChange = (event, index, value) => this.setState({value});
  addOption = (entity) => {
    const a = this.state.actions;
    let found = a.find((element) => {
      return element.entity === entity;
    });
    if (found) return;
    found = this.state.list.find((element) => {
      return element.entity === entity;
    });
    found.actions.forEach(q => {
      a.push({entity: found.entity, type: q.type, description: q.description})
    })
    this.setState({actions: a})
  }
  renderItem = (action) => {
    switch (action.type) {
      case 'pushNotification' : {
        return  <MenuItem primaryText={action.description} onClick={() => this.props.loadComponent('PushNotification', {type: 'editPushNotification'})}/>
      }
      default: {
         return  <MenuItem primaryText={action.description} />       
      }
    }
  }
  render() {
    return (
      <div className={`actions ${this.state.showList ? 'showList' : ''}`}>
      {this.props.actions && this.props.actions.map((item, index) => <div key={index}>{item.type}</div>)}
        <AddBtn handleClick={this.showList}/>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          {this.state.actions && <Menu>
            {this.state.actions.map(q => 
              this.renderItem(q)
            )}
          </Menu>}
        </Popover>
      </div>
    )
  }
}

export default Actions