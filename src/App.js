import React, { Component } from 'react';
import './App.css';
import Login from './Components/Login/Login'
import DashBoard from './DashBoard';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuth: !!localStorage.jwt
    }
  }
  componentDidMount() {
    this.setState({
      isAuth: !!localStorage.jwt
    })
  }
  render() {
    return (
      <div className="App">
      {localStorage.jwt? <DashBoard/>:<Login/>}
      </div>    );
    }
  }
  
  export default App;