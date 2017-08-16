import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Checkbox from 'material-ui/Checkbox';
import _ from 'lodash';
import config from '../../config';
import './triggers.css';

class ShowMultiple extends Component {
  render() {
    return (
      <Checkbox
        label="show multiple times"
        onCheck={(event, isInputChecked) => this.props.handleCheck(this.props.desc, isInputChecked)}
        checked={this.props.checked || false}
      />
    )
  }
}

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
        this.setState({ resData: response.data });
        this.formatData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  initObj() {
    return {
      'resInTheLastHours': {value: ''},
      'peopleBookedInThePastHour': {value: ''},
      'peopleBookedInThePast24': {value: ''},
      'peopleOnSite': {value: ''},
      'peopleJoinedInTheLastHours': {value: ''}
    }
  }

  formatData = (data) => {
    const obj = this.initObj();
    _.forEach(data, item => {
      obj[item.description] = {
        value: item.value,
        showMultiple: item.showMultiple 
      };
    })
    this.setState({ data: obj });
  }

  handleCheck = (description, showMultiple) => {
    this.save(description, null, showMultiple)
  }

  save = (description, newValue, showMultiple) => {
    const trigger = _.find(this.state.resData, q => q.description === description);
    if (trigger) {
      axios.put(`${config.ruleServer}api/triggers/${trigger._id}`, {
        newValue,
        showMultiple
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
        newValue,
        showMultiple
      })
        .then((response) => {
          this.loadRules()
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  handelChange = (description, newValue) => {
    this.save(description, newValue, null)
  }

  render() {
    return (
      <div className="triggers">
        <div>
            <div className="wrapper-trigger">
              <div>Was there a reservation in the last <TextField hintText="xxx" value={this.state.data['resInTheLastHours'].value} type="number" onChange={(event, newValue) => this.handelChange('resInTheLastHours', newValue)} /> minutes?</div>
              <ShowMultiple handleCheck={this.handleCheck} desc="resInTheLastHours" checked={this.state.data['resInTheLastHours'].showMultiple}/>
            </div>
            <div className="wrapper-trigger">
              <div>How many people have booked in the past hour? <TextField hintText="minimum people" value={this.state.data['peopleBookedInThePastHour'].value} type="number" onChange={(event, newValue) => this.handelChange('peopleBookedInThePastHour', newValue)} /></div>
              <ShowMultiple handleCheck={this.handleCheck} desc="peopleBookedInThePastHour" checked={this.state.data['peopleBookedInThePastHour'].showMultiple}/>
            </div>
            <div className="wrapper-trigger">
              <div>How many people have booked in the past 24 hours? <TextField hintText="minimum people" value={this.state.data['peopleBookedInThePast24'].value} type="number" onChange={(event, newValue) => this.handelChange('peopleBookedInThePast24', newValue)} /></div>
              <ShowMultiple handleCheck={this.handleCheck} desc="peopleBookedInThePast24" checked={this.state.data['peopleBookedInThePast24'].showMultiple}/>
            </div>
            <div className="wrapper-trigger">
              <div>How many people are currently on the site? <TextField hintText="minimum people" type="number" value={this.state.data['peopleOnSite'].value} onChange={(event, newValue) => this.handelChange('peopleOnSite', newValue)} /></div>
              <ShowMultiple handleCheck={this.handleCheck} desc="peopleOnSite" checked={this.state.data['peopleOnSite'].showMultiple}/>
            </div> 
            <div className="wrapper-trigger">
              <div>How many people have joined in the last <TextField hintText="xxx" type="number" value={this.state.data['peopleJoinedInTheLastHours'].value} onChange={(event, newValue) => this.handelChange('peopleJoinedInTheLastHours', newValue)} /> minutes?</div>
              <ShowMultiple handleCheck={this.handleCheck} desc="peopleJoinedInTheLastHours" checked={this.state.data['peopleJoinedInTheLastHours'].showMultiple}/>
            </div>
          </div>
        </div>
        );
  }
}

export default Triggers;