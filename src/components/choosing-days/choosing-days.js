import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import './choosing-days.css';

class ChoosingDays extends Component {
  render() {
    return (
      <div className="choosingDays">
        <Checkbox
          label="Sun"
          onCheck={() => this.props.handleChooseDay(0)}
        />
        <Checkbox
          label="Mon"
          onCheck={() => this.props.handleChooseDay(1)}
        />
        <Checkbox
          label="Tue"
          onCheck={() => this.props.handleChooseDay(2)}
        />
        <Checkbox
          label="Wed"
          onCheck={() => this.props.handleChooseDay(3)}
        />
        <Checkbox
          label="Thu"
          onCheck={() => this.props.handleChooseDay(4)}        
        />
        <Checkbox
          label="Fri"
          onCheck={() => this.props.handleChooseDay(5)}
        />
        <Checkbox
          label="Sut"
          onCheck={() => this.props.handleChooseDay(6)}
        />
      </div>
    );
  }
}

export default ChoosingDays;