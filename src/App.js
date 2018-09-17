import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RulesList from './components/rules-list/rules-list';
import RightSection from './components/right-section/right-section';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      rightSectionComp: 'RuleEditor',
      rightSectionData: null,
      currentRule: null
    };

  }
  loadRules = () => {
    this.refs.rulesListReference.loadRules()
  }

  changeRightSection = (component, data) => {
    switch (data && data.type) {
      case 'rule': {
        this.setState({currentRule: data, rightSectionComp: 'RuleEditor', rightSectionData: data});
        break;
      }
      case 'newActionSaved': {
        const t = this.state.currentRule;
        t.actions = t.actions || [];
        t.actions.push(data.action);
        this.setState({currentRule: t, rightSectionComp: 'RuleEditor', rightSectionData: t})
        break;
      }
      case 'editPushNotification': {
        this.setState({rightSectionComp: 'PushNotification', rightSectionData: data})
        break;       
      }
      default: break;
    }
    // if (data && data.type === 'rule') {
    //   this.setState({currentRule: data})
    // } else if (data && data.type === 'actionSaved') {
    //   data = Object.assign(data, this.state.currentRule)
    // }
    // this.setState({rightSectionComp: component, rightSectionData: data});
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <AppBar
            title="Recollect"
            showMenuIconButton={false}
          />
          <RulesList ref="rulesListReference" ruleClicked={(rule) => this.changeRightSection('RuleEditor', rule)}/>
          <RightSection loadComponent={this.changeRightSection} loadRules={this.loadRules} component={this.state.rightSectionComp} data={this.state.rightSectionData}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
