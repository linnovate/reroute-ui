import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';

class Actions extends Component {
  constructor() {
    super();
    this.state = {
      actions: ['webhook', 'index', 'save to mongo'],
      value: '',
    };

    this.handleActionChange = this.handleActionChange.bind(this);
  }

  handleActionChange(event, index, value) {
    this.setState({ value });
    this.props.updateRule('update', 'action', { name: value, data: {}, arrayIndex: this.props.currentRule.actions.length - 1 });
  }

  render() {
    return (
      <div className="actions">
        <div>
          {this.props.currentRule.actions[0].name &&
            <List>
              {this.props.currentRule.actions.map((action, index) =>
                <ListItem primaryText={action.name} key={index} />,
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
