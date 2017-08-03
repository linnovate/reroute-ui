import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import update from 'react/lib/update';
import _ from 'lodash';
import { Tabs, Tab } from 'material-ui/Tabs';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SentenceEdit from '../sentence-edit/sentence-edit';
import ManageRooms from './manage-rooms';
import ContainerRules from './container-rules';
import config from '../../config';

import './sentences.css';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sut'];

class Sentences extends Component {
  constructor() {
    super();
    this.state = {
      currentRule: this.initRuleObj(),
      currentRuleAction: this.initRuleActionObj(),
      rules: [],
      available: true
    }

    this.loadRules();
  }

  initRuleActionObj() {
    return {
      sentence: {
        value: ''
      },
      color: {
        value: ''
      },
      effect: {
        value: ''
      }
    }
  }

  initRuleObj() {
    return {
        available: true,
        hotel: {
          value: []
        },
        error: {
          value: ''
        },
        'include dates': {
          value: [{
            min: null,
            max:null,
            focusedInput: null
          }]
        },
        'exclude dates': {
          value: [{
            min: null,
            max:null,
            focusedInput: null
          }]
        },
        'check in day': {
          value: []
        },
        'check out day': {
          value: []
        },
        'staying days': {
          value: []
        },
    }
  }

  editRule = (rule) => {
    const ruleObj = this.initRuleObj();
    ruleObj._id = rule._id
    const mergedRule = _.merge({}, ruleObj, rule.ruleObj.conditions);
    this.setState({ currentRule: mergedRule, currentRuleAction: rule.ruleObj.action });
  }

  showCurrentRule = (currentRule, currentRuleAction) => {
    if (Object.keys(currentRule).length === 0) return '';
    let conditions = [];
    Object.keys(currentRule).forEach((item) => {
      const currentItem = currentRule[item];
      switch (currentItem.sign) {
        case 'equal': {
          conditions.push(`${currentItem.factProp} = ${currentItem.value}`);
          break;
        }
        case 'equal or null': {
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
    if (currentRuleAction.sentence.value !== '') {
      const conditions = [];
      Object.keys(currentRuleAction).forEach((item) => {
        const currentItem = currentRuleAction[item];
        if (currentItem.sign) {
          conditions.push(`${currentItem.factProp} = ${currentItem.value}`);
        }     
      });
      ruleStr = `${ruleStr} THEN ${_.join(conditions, ' AND ')}`
    }
    return ruleStr;
  }

  saveRule = () => {
    const ruleStr = this.showCurrentRule(this.state.currentRule, this.state.currentRuleAction);
    if (this.state.currentRule._id) {
      axios.put(`${config.ruleServer}api/rules/${this.state.currentRule._id}`, { 
        ruleName: ruleStr, 
        ruleObj: {conditions: this.state.currentRule, action: this.state.currentRuleAction} 
      })
      .then((response) => {
        this.loadRules()
      })
      .catch(function (error) {
        console.log(error);
      });

    } else {
      axios.post(`${config.ruleServer}api/rules`, { 
        ruleName: ruleStr, 
        ruleObj: {conditions: this.state.currentRule, action: this.state.currentRuleAction},
        type: 'sentences'

      })
      .then((response) => {
        this.loadRules()
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  loadRules = (available = this.state.available) => {
    axios.get(`${config.ruleServer}api/rules`, {
      params: {
        type: 'sentences',
        available
      }
    })
    .then((response) => {
      const rule = this.initRuleObj();
      rule.available = this.state.available
      this.setState({ 
        rules: response.data,
        currentRule: rule,
        currentRuleAction: this.initRuleActionObj()
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updateRule = (data) => {
    if (data.value === 'irrelevant') {
      const tmp = this.state.currentRule;
      tmp[data.key] = {
        value: ''
      };
      this.setState({ currentRule: tmp })
    } else if (Array.isArray(data.value) && data.value.length === 0) {
        const tmp = this.state.currentRule;
        tmp[data.key] = {
          value: []
        };
        this.setState({ currentRule: tmp })
    } else {
      this.setState({ currentRule: Object.assign(this.state.currentRule, {[data.key]: { value: data.value, sign: data.sign, factProp: data.factProp }}) });
    }
    
  }

  updateRuleAction = (data) => {
    if (data.value === 'irrelevant') {
      const tmp = this.state.currentRuleAction;
      tmp[data.key] = {
        value: ''
      };
      this.setState({ currentRuleAction: tmp })
    } else if (Array.isArray(data.value) && data.value.length === 0) {
        const tmp = this.state.currentRuleAction;
        tmp[data.key] = {
          value: []
        };
        this.setState({ currentRuleAction: tmp })
    } else {
      this.setState({ currentRuleAction: Object.assign(this.state.currentRuleAction, {[data.key]: { value: data.value, sign: data.sign, factProp: data.factProp }}) });
    }

  }

  handleTab = (bool) => {
    const rule = this.initRuleObj();
    rule.available = bool;
    this.setState({ currentRule: rule, currentRuleAction: this.initRuleActionObj(), available: bool });
    this.loadRules(bool);
  }

  moveRule = (dragIndex, hoverIndex) => {
    const rules = this.state.rules;
    const dragRoom = rules[dragIndex];

    this.setState(update(this.state, {
      rules: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRoom],
        ],
      },
    }));

    axios.put(`${config.ruleServer}api/rules`, { 
        rules: this.state.rules
    })
    .then((response) => {
      this.loadRules()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  deleteRule = (rule) => {
    axios.delete(`${config.ruleServer}api/rules/${rule._id}`)
      .then((response) => {
        this.loadRules();
      })
      .catch(function (error) {
        console.log(error);
      });

  }



  render() {
    return (
      <div className="sentences">
        <Tabs className="tabs">
          <Tab label="Available" onActive={() => this.handleTab(true)}>
            <div>
              <SentenceEdit 
                currentRule={this.state.currentRule} 
                updateRule={this.updateRule} 
                updateRuleAction={this.updateRuleAction} 
                currentAction={this.state.currentRuleAction}
                currentTab="available"
              />
            </div>
          </Tab>
          <Tab label="Not Available" onActive={() => this.handleTab(false)}>
            <div>
              <SentenceEdit 
                currentRule={this.state.currentRule} 
                updateRule={this.updateRule} 
                updateRuleAction={this.updateRuleAction} 
                currentAction={this.state.currentRuleAction}
                currentTab="not available"
              />
            </div>
          </Tab>
          <Tab label="Rooms">
            <div>
              <ManageRooms />
            </div>
          </Tab>
        </Tabs>
        <div>
          rules
          <div>
            {this.showCurrentRule(this.state.currentRule, this.state.currentRuleAction)}
          </div>
          <RaisedButton label="Save Rule" onTouchTap={this.saveRule} />
        </div>
        <ContainerRules editRule={this.editRule} deleteRule={this.deleteRule} loadRules={this.loadRules} rules={this.state.rules} moveRule={this.moveRule} />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Sentences);
