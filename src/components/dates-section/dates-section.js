import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import _ from 'lodash';
import RangeDatesMultiple from '../range-dates-multiple/RangeDatesMultiple';
import ChoosingDays from '../choosing-days/choosing-days';
//import './Dates.css';

class DatesSection extends Component {
  constructor() {
    super();
    this.state = {
      'check in day': [],
      'check out day': [],
      'staying days': []
    }

    this.updateDays = this.updateDays.bind(this);
  }
  updateRangeDates(field, dates) { 
    if(field === 'include dates') {
      this.props.updateRule({ key: 'include dates', sign: 'in multi range', value: dates, factProp: { min: 'checkin', max: 'checkout' } });
    } else if(field === 'exclude dates') {
      this.props.updateRule({ key: 'exclude dates', sign: 'not in multi range', value: dates, factProp: { min: 'checkin', max: 'checkout' } });
    }

  }
  updateDays(field, day, factProp) {
    const array = this.state[field];
    const removed = _.remove(array, function(n) {
      return n === day;
    });
    if (removed.length === 0) {
      array.push(day);
    }
    this.setState({ [field]: array})
    if (field === 'staying days') {
      this.props.updateRule({ key: field, sign: 'range in days array', value: array, factProp: factProp });
    } else this.props.updateRule({ key: field, sign: 'in days array', value: array, factProp: factProp });
  }
  render() {
    return (
      <div className="DatesRule">
          EXCLUDE DATES: <RangeDatesMultiple handleCloseDatepicker={(dates) => this.updateRangeDates('exclude dates', dates)} />
          ON THIS DATES: <RangeDatesMultiple handleCloseDatepicker={(dates) => this.updateRangeDates('include dates', dates)} />
          <div>
           Check in day: <ChoosingDays handleChooseDay={(day, value) => this.updateDays('check in day', day, 'checkin')}/>
           Check out day: <ChoosingDays handleChooseDay={(day, value) => this.updateDays('check out day', day, 'checkout')}/>
           Staying days: <ChoosingDays handleChooseDay={(day, value) => this.updateDays('staying days', day, {min: 'checkin', max: 'checkout'})}/>
          </div>
      </div>
    );
  }
}

export default DatesSection;