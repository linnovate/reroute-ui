import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';
import './RangeDatesMultiple.css';

class RangeDatesMultiple extends Component {
  constructor() {
    super();

    this.handleAddRange = this.handleAddRange.bind(this);
    this.closingFlag = false;
  }

  handleAddRange() {
    this.setState({datesValues: [...this.state.datesValues, {min: null, max: null, focusedInput: null }]});

  }
  componentWillMount() {
    this.setState({
      datesValues: this.props.dates
    })
  }
  componentWillReceiveProps(nextProps){
    this.setState({ datesValues: nextProps.dates })
  }
  onDatesChange = (startDate, endDate, index) => {
    const tmp = this.state.datesValues;
    tmp[index].min = startDate;
    tmp[index].max = endDate;
    this.setState({ datesValues: tmp });
    if (this.closingFlag) {
      this.closingFlag = false;
      this.props.handleCloseDatepicker(this.state.datesValues);
    }
  }

  onFocusChange = (focusedInput, index) => {
    const tmp = this.state.datesValues;
    tmp[index].focusedInput = focusedInput;
    this.setState({ datesValues: tmp })
  }

  handleCloseDatepicker = () => {
    this.closingFlag = true;
  }

  render() {
    return (
      <div className="rangeDatesMultiple">
      <div className="RangeDatesWrapper">
        {this.state.datesValues.map((item, index) =>
          <DateRangePicker
            key={index}
            startDate={item.min ? moment(item.min) : item.min}
            endDate={item.max ? moment(item.max) : item.max}
            onDatesChange={({ startDate, endDate }) => this.onDatesChange(startDate, endDate, index)}
            focusedInput={item.focusedInput}
            onFocusChange={focusedInput => this.onFocusChange(focusedInput, index)}
            onClose={this.handleCloseDatepicker}
          />
        )}
      </div>
      <RaisedButton label="Add Range" onTouchTap={this.handleAddRange} />
      </div>
    );
  }
}

export default RangeDatesMultiple;