import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { request } from 'graphql-request'
import axios from 'axios';
import config from '../../config';
import Conditions from '../conditions/conditions';
import Actions from '../actions/actions';
import Entities from '../entities/entities';
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
    if (this.props.data)
        this.initRule(this.props.data)
    this.getEntities();
  }
  componentWillReceiveProps(nextProps) {
    this.initRule(nextProps.data)
  }
  getEntities = () => {
    const query = `{
      entities {
        entity
        subEntities {
          name
        }
        actions {
          type
          description
        }
      }
    }`
    request('http://localhost:3007/graphql', query).then(data => {
      const e = [];
      const actions = [];
      data.entities.forEach((q) => {
        q.subEntities.forEach((w) => {
          e.push({entity: q.entity, value: `${q.entity}: ${w.name}`, label: `${q.entity}: ${w.name}`})
        })
        actions.push({entity: q.entity, actions: q.actions})
      });
      this.setState({entities: e, actions})
    })
  }
  initRule = (data) => {
    const r = {
      title: data.title,
      description: data.description,
      id: data._id,
      conditions: data.ruleObj && data.ruleObj.conditions,
      actions: data.actions || (data.ruleObj && data.ruleObj.actions),
      entities: data.ruleObj && data.ruleObj.entities
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
  addActions = (entity) => {

  }
  selectEntity = (selected) => {
    this.refs.actionsReference.addOption(selected.entity)
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
          actions: this.state.ruleDetails.actions
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
          className="title"
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
          className="description"
          name="description"
          onChange={this.handleInputChange}
          value={this.state.ruleDetails.description}
        />
        </div>
        <div className="field-wrapper">
          <span>Entity</span>
          <Entities selectEntity={this.selectEntity} ref="entitiesReference" entities={this.state.ruleDetails.entities} entitiesOptions={this.state.entities}/>
        </div>
        <div className="field-wrapper">
          <span>Conditions</span>
          <Conditions conditions={this.state.ruleDetails.conditions} ref="conditionsReference"/>
        </div>
        <div className="field-wrapper">
          <span>Actions</span>
          <Actions ref="actionsReference" actionsOptions={this.state.actions} actions={this.state.ruleDetails.actions} loadComponent={this.props.loadComponent}/>
        </div>
        <div className="bottom">
          <RaisedButton 
          label="Save" 
          onClick={this.save} 
          buttonStyle={{backgroundColor: '#2F80ED', width: '153px', height: '45px'}}
          labelStyle={{color: 'white'}}
          />
        </div>
      </div>
    )
  }
}

export default RuleEditor;