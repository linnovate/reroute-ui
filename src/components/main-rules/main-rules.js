import React, { Component } from 'react';
// import { Tabs, Tab } from 'material-ui/Tabs';
import _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import axios from 'axios';
// import DatesSection from '../dates-section/dates-section';
// import PaxSection from '../pax-section/pax-section';
// import ClubMemberSection from '../club-member-section/club-member-section';
// import ActionSection from '../action-section/action-section';
// import RoomSection from '../room-section/room-section';
import RulesList from '../rules-list/rules-list';
// import HotelSelect from '../hotel-select/hotel-select';
import CreateRule from '../create-rule/create-rule';
import config from '../../config';
import './main-rules.css';

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

class MainRulesView extends Component {
  constructor() {
    super();
    this.state = {
      currentRule: this.initRuleObj(),
      rules: [],
      currentRuleStr: '',
    };
    this.loadRules = this.loadRules.bind(this);
    this.updateRule = this.updateRule.bind(this);
    this.addItem = this.addItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.updateRuleAction = this.updateRuleAction.bind(this);
    this.saveRule = this.saveRule.bind(this);
    this.editRule = this.editRule.bind(this);
    this.deleteRule = this.deleteRule.bind(this);
    this.updateCurrentRuleStr = this.updateCurrentRuleStr.bind(this);

    this.loadRules();
  }

  initRuleObj() {
    return {
      conditions: [JSON.parse(JSON.stringify(initialValues.condition))],
      actions: [JSON.parse(JSON.stringify(initialValues.action))],
    };
  }

  loadRules() {
    axios.get(`${config.ruleServer}api/rules`)
    .then((response) => {
      const currentRule = this.initRuleObj();
      currentRule.updateExistingValues = true;
      this.setState({
        rules: response.data,
        currentRule,
        currentRuleStr: '',
      });
      setTimeout(() => {
        currentRule.updateExistingValues = false;
        this.setState({ currentRule,});
      }, 0);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  addItem(type) {
    const tmp = this.state.currentRule;
    const key = `${type}s`;

    if ((key === 'conditions' && (!tmp[key][tmp[key].length - 1].key || !tmp.conditions[tmp.conditions.length - 1].value)) ||
      (key === 'actions' && (!tmp[key][tmp[key].length - 1].name))) return;
    tmp[key].push(JSON.parse(JSON.stringify(initialValues[type])));
    this.setState({
      currentRule: tmp,
    });
  }
  updateItem(type, data) {
    const key = `${type}s`;
    const tmp = this.state.currentRule;
    tmp[key][data.arrayIndex] = data;
    this.setState({
      currentRule: tmp,
    });
  }

  updateCurrentRuleStr(currentRule) {
    const conditions = [];
    currentRule.conditions.forEach((item) => {
      const currentItem = item;
      switch (currentItem.sign) {
        case 'equal': {
          conditions.push(`${currentItem.factProp} = ${currentItem.value}`);
          break;
        }
        case 'in multi range': {
          const range = [];
          currentItem.value.forEach((val) => {
            range.push(`${currentItem.factProp.min} >= ${new Date(val.min).toLocaleDateString()} AND ${currentItem.factProp.max} <= ${new Date(val.max).toLocaleDateString()}`);
          });
          conditions.push(`(${_.join(range, ' OR ')})`);
          break;
        }
        case 'not in multi range': {
          const range = [];
          currentItem.value.forEach((val) => {
            range.push(`${currentItem.factProp.min} < ${new Date(val.min).toLocaleDateString()} AND ${currentItem.factProp.max} > ${new Date(val.max).toLocaleDateString()}`);
          });
          conditions.push(`${_.join(range, ' OR ')}`);
          break;
        }
        case 'in days array': {
          const array = currentItem.value.sort().map(i => DAYS[i]);
          conditions.push(`${currentItem.factProp} is on ${_.join(array, ' / ')}`);
          break;
        }
        case 'range in days array': {
          const array = currentItem.value.sort().map(i => DAYS[i]);
          conditions.push(`${currentItem.factProp.min} - ${currentItem.factProp.max} include ${_.join(array, ' / ')}`);
          break;
        }
        case 'in array': {
          conditions.push(`${currentItem.factProp} is ${_.join(currentItem.value, '/')}`);
          break;
        }
        default: {
          break;
        }
      }
    });
    let ruleStr = `WHEN ${_.join(conditions, ' AND ')}`;
    if (currentRule.actions[0].name !== '') {
      let actionStr = currentRule.actions.map(action => action.name);
      actionStr = `THEN ${_.join(actionStr, ' AND ')}`;
      ruleStr = `${ruleStr} ${actionStr}`;
    }
    this.setState({
      currentRuleStr: ruleStr,
    });
  }

  updateRule(action, type, data) {
    switch (action) {
      case 'add':
        this.addItem(type, data);
        break;
      case 'update':
        this.updateItem(type, data);
        this.updateCurrentRuleStr(this.state.currentRule);
        break;
      default:
        console.log('action is missing');
    }
    
    // if (data.value === 'irrelevant') {
    //   const tmp = this.state.currentRule;
    //   tmp[data.key] = {
    //     value: '',
    //   };
    //   this.setState({ currentRule: tmp });
    // } else if (Array.isArray(data.value) && data.value.length === 0) {
    //   const tmp = this.state.currentRule;
    //   tmp[data.key] = {
    //     value: [],
    //   };
    //   this.setState({ currentRule: tmp });
    // } else {
    //   this.setState({ currentRule: Object.assign(this.state.currentRule, { [data.key]: { value: data.value, sign: data.sign, factProp: data.factProp } }) });
    // }
  }
  updateRuleAction(data) {
    this.setState({ currentRuleAction: data });
  }

  saveRule() {
    const ruleStr = this.state.currentRuleStr;
    if (this.state.currentRule._id) {
      axios.put(`${config.ruleServer}api/rules/${this.state.currentRule._id}`, { ruleName: ruleStr, ruleObj: this.state.currentRule })
      .then((response) => {
        this.loadRules();
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      axios.post(`${config.ruleServer}api/rules`, {
        ruleName: ruleStr,
        ruleObj: this.state.currentRule,
      })
      .then((response) => {
        this.loadRules();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  editRule(rule) {
    const ruleObj = this.initRuleObj();
    ruleObj._id = rule._id;
    const mergedRule = _.merge({}, ruleObj, rule.ruleObj);
    mergedRule.updateExistingValues = true;
    this.setState({ currentRule: mergedRule,});
    this.updateCurrentRuleStr(mergedRule);
    setTimeout(() => {
      mergedRule.updateExistingValues = false;
      this.setState({ currentRule: mergedRule,});
    }, 0);
  }

  deleteRule(rule) {
    axios.delete(`${config.ruleServer}api/rules/${rule._id}`)
      .then((response) => {
        this.loadRules();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="main-rules">
        <CreateRule updateRuleAction={this.updateRuleAction} updateRule={this.updateRule} currentRule={this.state.currentRule} />
        <RaisedButton disabled={!this.state.currentRule.actions[0].name || !this.state.currentRule.conditions[0].key || !this.state.currentRule.conditions[0].value} label="Save Rule" onTouchTap={this.saveRule}/>

        {this.state.currentRuleStr && <Subheader style={headerStyle}>Current Rule Name</Subheader>}
        <div className>{this.state.currentRuleStr}</div>
        <Subheader style={headerStyle}>Rules List</Subheader>
        <RulesList editRule={this.editRule} rules={this.state.rules} deleteRule={this.deleteRule} />
      </div>
    );
  }
}

export default MainRulesView;
