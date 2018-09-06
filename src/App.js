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
      rightSectionData: {}
    };

  }
  loadRules = () => {
    this.refs.rulesListReference.loadRules()
  }

  changeRightSection = (component, data) => {
    this.setState({rightSectionComp: component, rightSectionData: data});
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
          <RightSection loadRules={this.loadRules} component={this.state.rightSectionComp} data={this.state.rightSectionData}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
