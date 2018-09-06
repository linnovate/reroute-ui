import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import axios from 'axios';
import config from '../../config';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import './rules-list.css';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sut'];
const initialValues = {
  condition: {
    key: '',
    value: '',
    sign: 'equal',
  },
  action: {
    name: '',
    data: {},
  },
};

const headerStyle = {
  paddingLeft: 0,
  fontSize: '16px',
};

class RulesList extends Component {
  constructor() {
    super();
    this.state = {
      rulesList: []
    };
  }

  componentDidMount() {
    this.loadRules();
  }

  loadRules = () => {
    axios.get(`${config.ruleServer}api/rules`)
    .then((response) => {
      const currentRule = this.initRuleObj();
      // currentRule.updateExistingValues = true;
      this.setState({
        rulesList: response.data,
        currentRule,
        currentRuleStr: '',
      });
      // setTimeout(() => {
      //   currentRule.updateExistingValues = false;
      //   this.setState({ currentRule,});
      // }, 0);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  initRuleObj = () => {
    return {
      conditions: [JSON.parse(JSON.stringify(initialValues.condition))],
      actions: [JSON.parse(JSON.stringify(initialValues.action))],
    };
  }

  render() {
    return (
      <div className="rules-list">
        <div className="header">Rules</div>
        <List>
          {this.state.rulesList.map((rule, index) =>
          (<ListItem
            key={index}
            className="listItem"
            primaryText={rule.title}
            secondaryText={rule.description}
            onClick={(e) => this.props.ruleClicked(rule)}
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
