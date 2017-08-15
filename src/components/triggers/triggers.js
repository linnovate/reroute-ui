import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import _ from 'lodash';
import config from '../../config';
import './triggers.css';

class Triggers extends Component {
  constructor() {
    super();

    this.state = {
      data: this.initObj(),
      resData: []
    }
    this.loadRules();
  }

  loadRules = () => {
    axios.get(`${config.ruleServer}api/triggers`)
      .then((response) => {
        console.log('res', response);
        this.setState({ resData: response.data });
        this.formatData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  initObj() {
    return {
      'resInTheLastHours': '',
      'peopleBookedInThePastHour': '',
      'peopleBookedInThePast24': '',
      'peopleOnSite': '',
      'peopleJoinedInTheLastHours': ''
    }
  }

  formatData = (data) => {
    const obj = this.initObj();
    _.forEach(data, item => {
      obj[item.description] = item.value;
    })
    this.setState({ data: obj });
  }

  handelChange = (description, newValue) => {
    const trigger = _.find(this.state.resData, q => q.description === description);
    if (trigger) {
      axios.put(`${config.ruleServer}api/triggers/${trigger._id}`, {
        newValue
      })
        .then((response) => {
          this.loadRules()
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios.post(`${config.ruleServer}api/triggers`, {
        description,
        newValue
      })
        .then((response) => {
          this.loadRules()
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div className="triggers">
        <div>
          <div>Was there a reservation in the last <TextField hintText="xxx" value={this.state.data['resInTheLastHours']} type="number" onChange={(event, newValue) => this.handelChange('resInTheLastHours', newValue)} /> minutes?</div>
          <div>How many people have booked in the past hour? <TextField hintText="minimum people" value={this.state.data['peopleBookedInThePastHour']} type="number" onChange={(event, newValue) => this.handelChange('peopleBookedInThePastHour', newValue)}/></div>
          <div>How many people have booked in the past 24 hours? <TextField hintText="minimum people" value={this.state.data['peopleBookedInThePast24']} type="number" onChange={(event, newValue) => this.handelChange('peopleBookedInThePast24', newValue)}/></div>
          <div>How many people are currently on the site? <TextField hintText="minimum people" type="number" value={this.state.data['peopleOnSite']} onChange={(event, newValue) => this.handelChange('peopleOnSite', newValue)}/></div>
          <div>How many people have joined in the last <TextField hintText="xxx" type="number" value={this.state.data['peopleJoinedInTheLastHours']} onChange={(event, newValue) => this.handelChange('peopleJoinedInTheLastHours', newValue)}/> minutes?</div>
        </div>
      </div>
    );
  }
}

export default Triggers;