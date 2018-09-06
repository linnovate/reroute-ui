import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import config from '../../config';

import Conditions from '../conditions/conditions';
import './style.css';

class RuleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ruleDetails: {
        title: '',
        description: ''
      }
    }
  }
  componentDidMount() {
    this.initRule(this.props.data)
  }
  componentWillReceiveProps(nextProps) {
    this.initRule(nextProps.data)
  }
  initRule = (data) => {
    const r = {
      title: data.title,
      description: data.description,
      id: data._id
    };
    this.setState({ruleDetails: r})
  }
  handleInputChange = (event, newValue) => {
    const name = event.target.name;
    this.setState(prevState => ({
      ruleDetails: {
          ...prevState.ruleDetails,
          [name]: newValue
      }
    }))
  }
  save = () => {
    const conditions = this.refs.conditionsReference.getConditions()
    // const ruleStr = this.state.currentRuleStr;
    // if (this.state.currentRule._id) {
      axios.put(`${config.ruleServer}api/rules/${this.state.ruleDetails.id}`, { 
        title:  this.state.ruleDetails.title,
        description: this.state.ruleDetails.description,
        ruleObj: {
          conditions,
          actions: ['sevvvv', 'kkl']
        }
      })
      .then((response) => {
        this.props.loadRules();
      })
      .catch((error) => {
        console.log(error);
      });
    // } else {
    // axios.post(`${config.ruleServer}api/rules`, {
    //   //ruleName: ruleStr,
    //   title: this.state.ruleDetails.title,
    //   description: this.state.ruleDetails.description,
    //   //ruleObj: this.state.currentRule,
    // })
    // .then((response) => {
    //   this.props.loadRules();
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    //}
  }
  render() {
   return (
      <div className="rule-editor">
        <div className="field-wrapper">
          <span>Event name</span>
          <TextField
          name="title"
          fullWidth
          value={this.state.ruleDetails.title}
          onChange={this.handleInputChange}
        />
        </div>
        <div className="field-wrapper">
          <span>Description</span>
          <TextField
          fullWidth
          name="description"
          onChange={this.handleInputChange}
          value={this.state.ruleDetails.description}
        />
        </div>
        <div className="field-wrapper">
          <span>Conditions</span>
          <Conditions ref="conditionsReference"/>
        </div>
        <div className="actions">
          <RaisedButton label="Save" onClick={this.save} />
        </div>
      </div>
    )
  }
}

export default RuleEditor;