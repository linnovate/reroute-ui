import React, { Component } from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RulesList from './components/rules-list/rules-list';
import RightSection from './components/right-section/right-section';
import logo from './logo.svg';
import logoInner from './logo-inner.svg';

import './App.css';

// const muiTheme = getMuiTheme({
//   fontFamily: 'Lato-Medium',
//   appBar: {
//     height: 78,
//     color: '#2B405E',
//     padding: 36
//   },
// });

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
        t.ruleObj = t.ruleObj || {};
        t.ruleObj.actions = t.ruleObj.actions || [];
        t.ruleObj.actions.push(data.action);
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
      // <MuiThemeProvider muiTheme={muiTheme}>
        <div className="app">
          {/* <AppBar
            className="app-bar"
            title={<div className="title">
                    <div className="logo" style={{backgroundImage: `url(${logo})`}}>
                      <div className="logo-inner" style={{backgroundImage: `url(${logoInner})`}}></div>
                    </div>
                    <div className="recollect"><span>re</span><span>colllect</span></div></div>}
            showMenuIconButton={false}>

          </AppBar> */}
          <RulesList ref="rulesListReference" ruleClicked={(rule) => this.changeRightSection('RuleEditor', rule)}/>
          <RightSection loadComponent={this.changeRightSection} loadRules={this.loadRules} component={this.state.rightSectionComp} data={this.state.rightSectionData}/>
        </div>
      // </MuiThemeProvider>
    );
  }
}

export default App;
