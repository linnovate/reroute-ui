import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
// import injectTapEventPlugin from 'react-tap-event-plugin';

// import App from './App';
import DashBoard from './DashBoard';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

  <Router>
    <Route exact path="/dashboard" component={DashBoard} />
    <Route path="/dashboard" component={DashBoard} />
  </Router>

// injectTapEventPlugin();

ReactDOM.render(<DashBoard />, document.getElementById('root'));
registerServiceWorker();
