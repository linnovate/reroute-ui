import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Webhook from './webhook/webhook';
import Delay from './delay/delay';

class Actions extends Component {

  actionsComponents = {
    webhook: {
      title: 'Webhook settings',
      component: Webhook,
    },
    delay: {
      title: 'Delay settings',
      component: Delay,
    },
  }

  constructor() {
    super();
    this.state = {
      actions: ['webhook', 'index', 'save to mongo', 'delay'],
      value: '',
      openActionSettings: false,
    };

    this.handleActionChange = this.handleActionChange.bind(this);
  }

  handleActionChange(event, index, value) {
    this.setState({ value });
    this.props.updateRule('update', 'action', { name: value, data: {}, arrayIndex: this.props.currentRule.actions.length - 1 });
  }

  updateActionData = (data) => {
    const mergedData = _.merge({}, this.state.currentAction.data, data);
    const currentAction = this.state.currentAction;
    currentAction.data = mergedData;
    this.setState({ currentAction });
  }

  handleOpen = (action, index) => {
    const name = action.name;
    const data = action.data;
    if (!this.actionsComponents[name]) return;
    const ActionComponent = this.actionsComponents[name].component;
    this.setState({
      currentActionIndex: index,
      currentAction: action,
      openActionSettings: true,
      actionSettingsDialogData: <ActionComponent data={data} updateActionData={this.updateActionData} />,
      actionSettingsModalTitle: this.actionsComponents[name].title,
    });
  };

  updateRuleActionData = () => {
    this.props.updateRule('update', 'action', { name: this.state.currentAction.name, data: this.state.currentAction.data, arrayIndex: this.state.currentAction.currentActionIndex });
    this.handleClose();
  }

  handleClose = () => {
    this.setState({openActionSettings: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={false}
        onClick={this.updateRuleActionData}
      />,
    ];

    return (
      <div className="actions">
        <div>
          {this.props.currentRule.actions[0].name &&
            <List>
              {this.props.currentRule.actions.map((action, index) =>
                <ListItem primaryText={action.name} key={index} onClick={() => this.handleOpen(action, index)}/>
                )}
            </List>}
          <SelectField
            floatingLabelText="action"
            onChange={this.handleActionChange}
            value={this.state.value}
          >
            {this.state.actions.map((item, index) =>
              <MenuItem key={index} value={item} primaryText={item} />,
            )}
          </SelectField>
           <Dialog
              title={this.state.actionSettingsModalTitle}
              actions={actions}
              modal={true}
              open={this.state.openActionSettings}>
              {this.state.actionSettingsDialogData}
          </Dialog>
        </div>
      </div>
    );
  }
}

Actions.propTypes = {
  currentRule: PropTypes.object.isRequired,
  updateRule: PropTypes.func.isRequired,
};

export default Actions;
