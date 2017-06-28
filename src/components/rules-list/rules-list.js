import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Subheader from 'material-ui/Subheader';
import axios from 'axios';

import './rules-list.css';
class RulesList extends Component {
  constructor() {
    super();

    this.state = {
    }
  }
  deleteRule(rule) {
    axios.delete(`http://localhost:4040/api/rules/${rule._id}`)
      .then((response) => {
        this.props.loadRules();
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {
    return (
      <div className="rulesList">
        <List>
        <Subheader inset={true}>Rules List</Subheader>
        {this.props.rules.map((rule, index) =>
           <ListItem 
              key={index}
              className="listItem"
              primaryText={rule.name} 
              leftIcon={<div className="actionsIcons"><EditorModeEdit /> <ActionDelete onClick={() => this.deleteRule(rule)} /></div>} 
            />
          )}
        </List>
      </div>
    );
  }
}

export default RulesList;
