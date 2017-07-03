import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { gql, graphql } from 'react-apollo';
import _ from 'lodash';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import DatesSection from '../dates-section/dates-section';
import PaxSection from '../pax-section/pax-section';
import ClubMemberSection from '../club-member-section/club-member-section';
import ActionSection from '../action-section/action-section';
import RoomSection from '../room-section/room-section';
import RulesList from '../rules-list/rules-list';
import './upsale-category.css';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sut'];

class UpsaleCategory extends Component {
  constructor() {
    super();
    this.state = {
      hotels: [],
      hotelvalues: [],
      currentRule: {},
      currentRuleAction: '',
      rules: [],
    }
    this.loadRules = this.loadRules.bind(this);
    this.loadRules();
  }
  componentWillReceiveProps(newProps) {
    if( !newProps.data.loading) {
      this.setState({ hotels: newProps.data.hotels })
    }
  }

  loadRules() {
    axios.get('http://localhost:4040/api/rules')
    .then((response) => {
      this.setState({ 
        rules: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleHotelsChange = (event, index, values) => {
    this.setState({ hotelvalues: values });
    this.updateRule({ key: 'hotel', sign: 'in array', value: values, factProp: 'hotel' });
  }
  
  menuItems(values) {
    return this.state.hotels.map((hotel) => (
      <MenuItem
        key={hotel.hotelID}
        insetChildren={true}
        checked={values && values.indexOf(hotel.hotelID) > -1}
        value={hotel.hotelID}
        primaryText={`${hotel.hotelID} - ${hotel.name}`}
      />
    ));
  }

  updateRule = (data) => {
    if (data.value === 'irrelevant') {
      const tmp = this.state.currentRule;
      delete tmp[data.key];
      this.setState({ currentRule: tmp })
    } else {
      this.setState({ currentRule: Object.assign(this.state.currentRule, {[data.key]: { value: data.value, sign: data.sign, factProp: data.factProp }}) });
    }
    
  }
  updateRuleAction = (data) => {
    this.setState({ currentRuleAction: data.specialServiceCode})
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
    axios.post('http://localhost:4040/api/rules', { ruleName: ruleStr, ruleObj: {conditions: this.state.currentRule, action: this.state.currentRuleAction} })
    .then((response) => {
      this.loadRules()
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render() {
    return (
      <div className="UpsaleCategory">
        <div>
          <SelectField
            multiple={true}
            hintText="Select a hotel"
            value={this.state.hotelvalues}
            onChange={this.handleHotelsChange}
          >
            {this.menuItems(this.state.hotelvalues)}
          </SelectField>
        </div>
        <Tabs className="tabs">
          <Tab label="Pax" >
            <div>
              <PaxSection updateRule={this.updateRule} />
            </div>
          </Tab>
          <Tab label="Dates" >
            <div>
              <DatesSection updateRule={this.updateRule} />
            </div>
          </Tab>
          <Tab label="Club Member" >
            <div>
              <ClubMemberSection updateRule={this.updateRule} />
            </div>
          </Tab>
          <Tab label="Room" >
            <div>
              <RoomSection hotelID={`10122`} updateRule={this.updateRule} />
            </div>
          </Tab>
          <Tab label="Action" >
            <div>
              <ActionSection updateRuleAction={this.updateRuleAction} />
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
        <RulesList loadRules={this.loadRules} rules={this.state.rules} />
      </div>
    );
  }
}

const UpsaleQuery = gql`
  query getData {
    hotels {
      hotelID
      name
    }
  }
`;

export default graphql(UpsaleQuery)(UpsaleCategory)