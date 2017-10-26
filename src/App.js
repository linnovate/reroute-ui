import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import MainRulesView from './components/main-rules/main-rules';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      ruleCategoryActive: 'main',
    };

    this.handleSidebarItemClicked = this.handleSidebarItemClicked.bind(this);
  }

  handleSidebarItemClicked(ruleCategory) {
    this.setState({ ruleCategoryActive: ruleCategory });
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <AppBar
            title="Rule Editor"
            showMenuIconButton={false}
          />
          <div className="main-view">
            {this.state.ruleCategoryActive === 'main' && <MainRulesView />}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
