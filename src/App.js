import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import Sidebar from './components/sidebar/sidebar';
import IconsCategory from './components/icons-category/icons-category';
import UpsaleCategory from './components/upsale-category/upsale-category';
import NewIconsCategory from './components/new-icons-category/new-icons-category';
import Sentences from './components/sentences/sentences';
import config from './config';
import './App.css';

const networkInterface = createNetworkInterface({
  uri: config.graphql
});
const client = new ApolloClient({
  networkInterface: networkInterface
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      ruleCategoryActive: 'upsale'
    }

    this.handleSidebarItemClicked = this.handleSidebarItemClicked.bind(this);
  }

  handleSidebarItemClicked(ruleCategory) {
    this.setState({ ruleCategoryActive: ruleCategory });

  }
  render() {
    return (
      <MuiThemeProvider>
      <ApolloProvider client={client}>
      <div className="app">
        <AppBar
          title="Rule Editor"
          showMenuIconButton={false}
        />
        <Sidebar activeItem={this.state.ruleCategoryActive} handleSidebarItemClicked={this.handleSidebarItemClicked} />
        <div className="main-view">
        {this.state.ruleCategoryActive === 'upsale' && <UpsaleCategory />}
        {this.state.ruleCategoryActive === 'icons' && <IconsCategory hotelID={'10122'} />}
        {this.state.ruleCategoryActive === 'newIcons' && <NewIconsCategory />}
        {this.state.ruleCategoryActive === 'sentences' && <Sentences />}
        </div>
      </div>
      </ApolloProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
