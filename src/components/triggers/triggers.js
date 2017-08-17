import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';
import config from '../../config';
import './triggers.css';

class ShowMultiple extends Component {
  render() {
    return (
      <Checkbox
        label="show multiple times"
        className="show-multi"
        onCheck={(event, isInputChecked) => this.props.handleCheck(this.props.desc, isInputChecked)}
        checked={this.props.checked || false}
      />
    )
  }
}

class Timeout extends Component {
  render() {
    return (
      <TextField 
        hintText="set timeout" 
        value={this.props.value} 
        type="number"
        onChange={(event, newValue) => this.props.handleChange(this.props.desc, newValue, 'timeout')} 
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
      'resInTheLastHours': {value: '', sentence: '', showMultiple: false, timeout: ''},
      'peopleBookedInThePastHour': {value: '', sentence: '', showMultiple: false, timeout: ''},
      'peopleBookedInThePast24': {value: '', sentence: '', showMultiple: false, timeout: ''},
      'peopleOnSite': {value: '', sentence: '', showMultiple: false, timeout: ''},
      'peopleJoinedInTheLastHours': {value: '', sentence: '', showMultiple: false, timeout: ''}
    }
  }

  formatData = (data) => {
    const obj = this.initObj();
    _.forEach(data, item => {
      obj[item.description] = {
        value: item.value,
        showMultiple: item.showMultiple,
        timeout: item.timeout,
        sentence: item.sentence
      };
    })
    this.setState({ data: obj });
  }

  handleCheck = (description, showMultiple) => {
    const tmp = this.state.data;
    tmp[description].showMultiple = showMultiple;
    this.setState({ data: tmp });
  }

  save = (description) => {
    const trigger = _.find(this.state.resData, q => q.description === description);
    if (trigger) {
      axios.put(`${config.ruleServer}api/triggers/${trigger._id}`, {
        newValue: this.state.data[description].value,
        sentence: this.state.data[description].sentence,
        showMultiple: this.state.data[description].showMultiple,
        timeout: this.state.data[description].timeout
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
        newValue: this.state.data[description].value,
        sentence: this.state.data[description].sentence,
        showMultiple: this.state.data[description].showMultiple,
        timeout: this.state.data[description].timeout
      })
        .then((response) => {
          this.loadRules()
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  handleChange = (description, newValue, field) => {
    console.log('handleChange', description, newValue, field)
    const tmp = this.state.data;
    tmp[description][field] = newValue;
    this.setState({ data: tmp });
  }

  render() {
    return (
      <div className="triggers">
        <div>
            <div className="wrapper-trigger">
              <div>Was there a reservation in the last <TextField hintText="xxx" value={this.state.data['resInTheLastHours'].value} type="number" onChange={(event, newValue) => this.handleChange('resInTheLastHours', newValue, 'value')} /> minutes?</div>
              <TextField floatingTextLabel="set sentence" hintText="set sentence" value={this.state.data['resInTheLastHours'].sentence} onChange={(event, newValue) => this.handleChange('resInTheLastHours', newValue, 'sentence')} />
              <ShowMultiple handleCheck={this.handleCheck} desc="resInTheLastHours" checked={this.state.data['resInTheLastHours'].showMultiple}/>
              <Timeout value={this.state.data['resInTheLastHours'].timeout} desc="resInTheLastHours" handleChange={this.handleChange}/>
              <RaisedButton label="SAVE" onClick={() => this.save('resInTheLastHours')}/>
            </div>
            <div className="wrapper-trigger">
              <div>How many people have booked in the past hour? <TextField hintText="minimum people" value={this.state.data['peopleBookedInThePastHour'].value} type="number" onChange={(event, newValue) => this.handleChange('peopleBookedInThePastHour', newValue, 'value')} /></div>
              <TextField hintText="set sentence" value={this.state.data['peopleBookedInThePastHour'].sentence} onChange={(event, newValue) => this.handleChange('peopleBookedInThePastHour', newValue, 'sentence')} />
              <ShowMultiple handleCheck={this.handleCheck} desc="peopleBookedInThePastHour" checked={this.state.data['peopleBookedInThePastHour'].showMultiple}/>
              <Timeout value={this.state.data['peopleBookedInThePastHour'].timeout} desc="peopleBookedInThePastHour" handleChange={this.handleChange} />
              <RaisedButton label="SAVE" onClick={() => this.save('peopleBookedInThePastHour')}/>
            </div>
            <div className="wrapper-trigger">
              <div>How many people have booked in the past 24 hours? <TextField hintText="minimum people" value={this.state.data['peopleBookedInThePast24'].value} type="number" onChange={(event, newValue) => this.handleChange('peopleBookedInThePast24', newValue, 'value')} /></div>
              <TextField hintText="set sentence" value={this.state.data['peopleBookedInThePast24'].sentence} onChange={(event, newValue) => this.handleChange('peopleBookedInThePast24', newValue, 'sentence')} />
              <ShowMultiple handleCheck={this.handleCheck} desc="peopleBookedInThePast24" checked={this.state.data['peopleBookedInThePast24'].showMultiple}/>
              <Timeout value={this.state.data['peopleBookedInThePast24'].timeout} desc="peopleBookedInThePast24" handleChange={this.handleChange} />
              <RaisedButton label="SAVE" onClick={() => this.save('peopleBookedInThePast24')}/>
            </div>
            <div className="wrapper-trigger">
              <div>How many people are currently on the site? <TextField hintText="minimum people" type="number" value={this.state.data['peopleOnSite'].value} onChange={(event, newValue) => this.handleChange('peopleOnSite', newValue, 'value')} /></div>
              <TextField hintText="set sentence" value={this.state.data['peopleOnSite'].sentence} onChange={(event, newValue) => this.handleChange('peopleOnSite', newValue, 'sentence')} />
              <ShowMultiple handleCheck={this.handleCheck} desc="peopleOnSite" checked={this.state.data['peopleOnSite'].showMultiple}/>
              <Timeout value={this.state.data['peopleOnSite'].timeout} handleChange={this.handleChange} desc="peopleOnSite"/>
              <RaisedButton label="SAVE" onClick={() => this.save('peopleOnSite')}/>
            </div> 
            <div className="wrapper-trigger">
              <div>How many people have joined in the last <TextField hintText="xxx" type="number" value={this.state.data['peopleJoinedInTheLastHours'].value} onChange={(event, newValue) => this.handleChange('peopleJoinedInTheLastHours', newValue, 'value')} /> minutes?</div>
              <TextField hintText="set sentence" value={this.state.data['peopleJoinedInTheLastHours'].sentence} onChange={(event, newValue) => this.handleChange('peopleJoinedInTheLastHours', newValue, 'sentence')} />
              <ShowMultiple 
                handleCheck={this.handleCheck} 
                desc="peopleJoinedInTheLastHours" 
                checked={this.state.data['peopleJoinedInTheLastHours'].showMultiple}
              />
              <Timeout 
                value={this.state.data['peopleJoinedInTheLastHours'].timeout} 
                desc="peopleJoinedInTheLastHours"
                handleChange={this.handleChange}
              />
              <RaisedButton label="SAVE" onClick={() => this.save('peopleJoinedInTheLastHours')}/>
            </div>
          </div>
        </div>
        );
  }
}

export default Triggers;