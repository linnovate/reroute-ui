import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import './choosing-days.css';

class ChoosingDays extends Component {
  render() {
    return (
      <div className="choosingDays">
        <Checkbox
          label="Sun"
          checked={this.props.days.indexOf(0) !== -1}
          onCheck={() => this.props.handleChooseDay(0)}
        />
        <Checkbox
          label="Mon"
          checked={this.props.days.indexOf(1) !== -1}
          onCheck={() => this.props.handleChooseDay(1)}
        />
        <Checkbox
          label="Tue"
          checked={this.props.days.indexOf(2) !== -1}
          onCheck={() => this.props.handleChooseDay(2)}
        />
        <Checkbox
          label="Wed"
          checked={this.props.days.indexOf(3) !== -1}
          onCheck={() => this.props.handleChooseDay(3)}
        />
        <Checkbox
          label="Thu"
          checked={this.props.days.indexOf(4) !== -1}
          onCheck={() => this.props.handleChooseDay(4)}        
        />
        <Checkbox
          label="Fri"
          checked={this.props.days.indexOf(5) !== -1}
          onCheck={() => this.props.handleChooseDay(5)}
        />
        <Checkbox
          label="Sut"
          checked={this.props.days.indexOf(6) !== -1}
          onCheck={() => this.props.handleChooseDay(6)}
        />
      </div>
    );
  }
}

export default ChoosingDays;