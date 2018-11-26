import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';

import './Filters.scss';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      range: 7,
      value: 'All',
      customRange: false,
      currentDate: '',
      customRangeTo: null,
      customRangeFrom: null,
      open: false
    };
    this.handleDateToChange = this.handleDateToChange.bind(this);
    this.handleDateFromChange = this.handleDateFromChange.bind(this);
    this.handleSelectChange1 = this.handleSelectChange1.bind(this);

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.currentDate !== this.props.currentDate){
      let date = this.buildDateFormat(nextProps.currentDate);
      this.setState({'currentDate': date});
    }
  }

  componentDidMount(){
    this.setState({'currentDate': this.props.currentDate});
  }

  buildDateFormat(d){
    let date = new Date(d);
    let days = date.getDate();
    if (days < 10)
      days = '0'+ days;
    return (date.getFullYear()+'-'+ (date.getMonth() + 1) +'-' + days);
 }
  
  handleSelectChange = event => {
    if (!event.target.value) return;
    if (event.target.value === 1){
      this.setState({'customRange': true});
    }
    else {
      this.setState({
        'customRange': false,
        'open': false
      });
    this.props.updateDateChange();
    this.props.onChangeRange(event.target.value);
    this.setState({ range: event.target.value });
    }
  };

  handleRadioChange = event => {
    this.setState({ value: event.target.value });
    this.props.onChangeStatus(event.target.value)  
  };

  buildDiff(date1, date2){
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
  }

  handleDateFromChange = event => {
    let date = this.buildDateFormat(event.target.value);
    this.setState({'customRangeFrom': date});
    var date1 = this.state.customRangeTo ? new Date(this.state.customRangeTo) : new Date(this.state.currentDate);
    var date2 = new Date(event.target.value);
    var diffDays = this.buildDiff(date1, date2); 
    this.props.onChangeRange(diffDays);
    this.props.onChangeCustomRange('from', event.target.value);
  }

  handleDateToChange = event => {
    let date = this.buildDateFormat(event.target.value);
    this.setState({'customRangeTo': date});
    var date1 = this.state.customRangeFrom ? new Date(this.state.customRangeFrom):new Date(this.state.currentDate);
    var date2 = new Date(event.target.value);
    var diffDays = this.buildDiff(date1, date2); 
    this.props.onChangeRange(diffDays);
    this.props.onChangeCustomRange('to', diffDays);
  }

  handleSelectChange1 = event => {
    this.setState({
      anchorEl: document.getElementsByClassName('date-range')[0],
      open: true
    });
  };

  render() {
    console.log('in render',this.state.currentDate)
    return (
      <div className="filters">
          <div className="date-range">
            <div className="rangeTxt">DATE RANGE</div>
            <div
              id="selectDate"
              value={this.state.range+"xdsd"}
              onClick={(e)=>this.handleSelectChange1(e)}
              >{this.state.range}wwww
            <Popover
              anchorEl={this.state.anchorEl}
              id="render-props-popover"
              open={this.state.open}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
              }}
            >
              <MenuItem value={7} onClick={(e)=>this.handleSelectChange(e)}>1 week</MenuItem>
              <MenuItem value={14} onClick={(e)=>this.handleSelectChange(e)}>2 weeks</MenuItem>
              <MenuItem value={30} onClick={(e)=>this.handleSelectChange(e)}>1 month</MenuItem>
              <MenuItem value={1} onClick={(e)=>this.setState({'customRange':true})}>custom</MenuItem>
              {this.state.customRange &&
              <MenuItem value={0}>
              <TextField
                  id="dateFrom"
                  label="From"
                  type="date"
                  onChange={this.handleDateFromChange}
                  value = {this.state.customRangeFrom}
                  defaultValue={this.state.currentDate}
                  className={'dateRange'}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </MenuItem>  
              }
              {this.state.customRange &&
                <MenuItem value={1}>
                <TextField
                  onChange={this.handleDateToChange}
                  id="dateTo"
                  label="To"
                  type="date"
                  value = {this.state.customRangeTo}
                  defaultValue={this.state.currentDate}
                  className={'dateRange'}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                  </MenuItem>     
              }  
               {this.state.customRange &&
                <Button color="primary" className={'button'}  onClick={this.handleDateToChange}
                >
                OK
              </Button>
               }   
                </Popover>
                </div>
          </div>
          <div className="filter">
            <FormControl component="fieldset" className="formControl">
            <RadioGroup
              className="group"
              value={this.state.value}
              onChange={this.handleRadioChange}
            >
              <FormControlLabel value="All" control={<Radio color="primary"/>} label="All" />
              <FormControlLabel value="CheckIn" control={<Radio color="primary"/>} label="CheckIn" />
              <FormControlLabel value="CheckOut" control={<Radio color="primary"/>} label="CheckOut" />
            </RadioGroup>
          </FormControl>
          </div>
      </div>
    )
  }
}

export default Filters;
