import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


//components
import Homepage from  '../components/Homepage';
import Park from '../components/Park';
import NestTable from '../components/NestTable';

const MainRouter = (props) =>(
    <Router>
        <div>
            <Switch>
                <Route path="/" component = {Homepage} exact={true}/>
                <Route path="/parks" component={Park}/>
                <Route path="/nests" component={NestTable}/>
                <Route component={NotFoundPage}/>
            </Switch>
            </div>
    </Router>
);

export default MainRouter