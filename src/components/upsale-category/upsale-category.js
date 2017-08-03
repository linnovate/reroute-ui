import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import DatesSection from '../dates-section/dates-section';
import PaxSection from '../pax-section/pax-section';
import ClubMemberSection from '../club-member-section/club-member-section';
import ActionSection from '../action-section/action-section';
import RoomSection from '../room-section/room-section';
import RulesList from '../rules-list/rules-list';
import HotelSelect from '../hotel-select/hotel-select';
import config from '../../config'
import './upsale-category.css';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sut'];

class UpsaleCategory extends Component {
  constructor() {
    super();
    this.state = {
      roomsByHotel: [],
      currentRule: this.initRuleObj(),
      currentRuleAction: '',
      rules: [],
    }
    this.loadRules = this.loadRules.bind(this);
    this.loadRules();
  }

  initRuleObj() {
    return {
        hotel: {
          value: []
        },
        room: {
          value: []
        },
        adults: {
          value: ''
        },
        children: {
          value: ''
        },
        infants: {
          value: ''
        },
        local: {
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
        clubMember: {
          value: ''
        },
        plancode : {
          value: ''
        }
    }
  }

  loadRules() {
    axios.get(`${config.ruleServer}api/rules`, {
      params: {
        type: 'upsales'
      }
    })
    .then((response) => {
      this.setState({ 
        rules: response.data,
        currentRule: this.initRuleObj(),
        currentRuleAction: ''
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updateHotel = (data) => {
    this.updateRule({ key: 'hotel', sign: 'in array', value: data, factProp: 'hotel' });
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
    this.setState({ currentRuleAction: data})
  }
  showCurrentRule = (currentRule, currentRuleAction) => {
    if (Object.keys(currentRule).length === 0) return '';
    const conditions = [];
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
    if (currentRuleAction !== '') {
      ruleStr = `${ruleStr} THEN ${currentRuleAction}`
    }
    return ruleStr;
  }

  saveRule = () => {
    const ruleStr = this.showCurrentRule(this.state.currentRule, this.state.currentRuleAction);
    if (this.state.currentRule._id) {
      axios.put(`${config.ruleServer}api/rules/${this.state.currentRule._id}`, { ruleName: ruleStr, ruleObj: {conditions: this.state.currentRule, action: this.state.currentRuleAction} })
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
        type: 'upsales'
      })
      .then((response) => {
        this.loadRules()
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  editRule = (rule) => {
    const ruleObj = this.initRuleObj();
    ruleObj._id = rule._id
    const mergedRule = _.merge({}, ruleObj, rule.ruleObj.conditions);
    this.setState({ currentRule: mergedRule, currentRuleAction: rule.ruleObj.action });
  }

  updateRooms = (data) => {
    this.setState({ roomsByHotel: data || [] });
  }

  render() {
    return (
      <div className="UpsaleCategory">
        <div>
          <HotelSelect 
            multiple={true}
            selectedHotel={this.state.currentRule.hotel.value}
            updateHotel={this.updateHotel} 
            updateRooms={this.updateRooms} 
          />
        </div>
        <Tabs className="tabs">
          <Tab label="Pax">
            <div>
              <PaxSection updateRule={this.updateRule} currentRule={this.state.currentRule} />
            </div>
          </Tab>
          <Tab label="Dates" >
            <div>
              <DatesSection updateRule={this.updateRule} currentRule={this.state.currentRule} />
            </div>
          </Tab>
          <Tab label="Club Member" >
            <div>
              <ClubMemberSection updateRule={this.updateRule} currentRule={this.state.currentRule} />
            </div>
          </Tab>
          <Tab label="Room" >
            <div>
              <RoomSection roomsByHotel={this.state.roomsByHotel} selectedHotels={this.state.currentRule.hotel.value} updateRule={this.updateRule} currentRule={this.state.currentRule} />
            </div>
          </Tab>
          <Tab label="Action" >
            <div>
              <ActionSection selectedHotels={this.state.currentRule.hotel.value} updateRuleAction={this.updateRuleAction} currentAction={this.state.currentRuleAction} />
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
        <RulesList editRule={this.editRule} loadRules={this.loadRules} rules={this.state.rules} />
      </div>
    );
  }
}

export default UpsaleCategory