import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import _ from 'lodash';
import { Tabs, Tab } from 'material-ui/Tabs';
import ManageIcons from '../manage-icons/manage-icons';
import SentenceEdit from '../sentence-edit/sentence-edit';


const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sut'];

class Sentences extends Component {
  constructor() {
    super();
    this.state = {
      hotels: [],
      currentRule: this.initRuleObj(),
      currentRuleAction: this.initRuleActionObj()
    }
  }


  componentWillReceiveProps(newProps) {
    if (!newProps.data.loading) {
      this.setState({ hotels: newProps.data.hotels })
    }
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



  render() {
    return (
      <div className="sentences">
        <Tabs className="tabs">
          <Tab label="Available">
            <div>
              <SentenceEdit 
                currentRule={this.state.currentRule} 
                hotels={this.state.hotels} 
                updateRule={this.updateRule} 
                updateRuleAction={this.updateRuleAction} 
                currentAction={this.state.currentRuleAction}
              />
            </div>
          </Tab>
          <Tab label="Not Available" >
            <div>
              <SentenceEdit 
                currentRule={this.state.currentRule} 
                hotels={this.state.hotels} 
                updateRule={this.updateRule} 
                updateRuleAction={this.updateRuleAction} 
                currentAction={this.state.currentRuleAction}
              />
            </div>
          </Tab>
        </Tabs>
        <div>
          rules
          <div>
            {this.showCurrentRule(this.state.currentRule, this.state.currentRuleAction)}
          </div>
          {/*<RaisedButton label="Save Rule" onTouchTap={this.saveRule} />*/}
        </div>
        {/*<RulesList editRule={this.editRule} loadRules={this.loadRules} rules={this.state.rules} />*/}
      </div>
    )
  }
}

const HotelsQuery = gql`
  query getData {
    hotels {
      hotelID
      name
    }
  }
`;

export default graphql(HotelsQuery)(Sentences)