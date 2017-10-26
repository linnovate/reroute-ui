import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import './rules-list.css';

class RulesList extends Component {
  constructor() {
    super();

    this.state = {
    };
  }

  render() {
    return (
      <div className="rules-list">
        <List>
          {this.props.rules.map((rule, index) =>
          (<ListItem
            key={index}
            className="listItem"
            primaryText={rule.name}
            leftIcon={<div className="actionsIcons"><EditorModeEdit onClick={() => this.props.editRule(rule)} /> <ActionDelete onClick={() => this.props.deleteRule(rule)} /></div>}
          />),
          )}
        </List>
      </div>
    );
  }
}

RulesList.defaultProps = {
  rules: [],
};

RulesList.propTypes = {
  rules: PropTypes.array,
  editRule: PropTypes.func.isRequired,
  deleteRule: PropTypes.func.isRequired,
};

export default RulesList;
