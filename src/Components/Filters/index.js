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
      customRangeTo: '',
      customRangeFrom: '',
      open: false
    };
    // this.diffDays;
    this.handleDateToChange = this.handleDateToChange.bind(this);
    this.handleDateFromChange = this.handleDateFromChange.bind(this);
    this.handleSelectChange1 = this.handleSelectChange1.bind(this);
    this.closePopover = this.closePopover.bind(this);
    this.arrRange = {
      7: '1 Week',
      14: '2 Week',
      30: '1 Month',
      1: 'custom'
    }
  }
  
  

  componentWillReceiveProps(nextProps){
    if(nextProps.currentDate !== this.props.currentDate){
      let date = this.buildDateFormat(nextProps.currentDate);
      if (this.props.currentDate === '')
        this.setState({
          'customRangeFrom': date,
          'customRangeTo': date
        });
      this.setState({
        'currentDate': date,
      });
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
    this.diffDays = this.buildDiff(date1, date2); 
    // this.props.onChangeRange(diffDays);
    // this.props.onChangeCustomRange('from', event.target.value);
  }

  handleDateToChange = event => {
    let date = this.buildDateFormat(event.target.value);
    this.setState({'customRangeTo': date});
    var date1 = this.state.customRangeFrom ? new Date(this.state.customRangeFrom):new Date(this.state.currentDate);
    var date2 = new Date(event.target.value);
    this.diffDays = this.buildDiff(date1, date2); 
    // this.props.onChangeRange(diffDays);
    // this.props.onChangeCustomRange('to', diffDays);
  }

  handleSelectChange1 = event => {
    if(this.state.open === false){
      this.setState({
        anchorEl: document.getElementsByClassName('date-range')[0],
        open: true
      });
     }    
  };

  closePopover = () => {
    this.setState({'open': false});
  }  

  handleDateChange = (diffDays) => {
    console.log('eeeeeeeee',this.diffDays)
    this.props.onChangeRange(this.diffDays);
    this.props.onChangeCustomRange('from', this.state.customRangeFrom);
    this.setState({'open': false});
  }

  render() {
    console.log('in render',this.state.currentDate)
    return (
      <div className="filters">
          <div className="date-range">
            <div className="rangeTxt">DATE RANGE</div>
            <div
              id="selectDate"
              value={this.state.range}
              onClick={(e)=>this.handleSelectChange1(e)}
              >{this.arrRange[this.state.range] ?this.arrRange[this.state.range]: 'custom'}
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
              <MenuItem value={1} onClick={(e)=>this.setState({'customRange':true, 'open': true})}>custom</MenuItem>
              {this.state.customRange &&
              <MenuItem value={0}>
              <TextField
                  id="dateFrom"
                  label="From"
                  type="date"
                  onChange={this.handleDateFromChange}
                  value = {this.state.customRangeFrom}
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
                  className={'dateRange'}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                  </MenuItem>     
              }  
               {this.state.customRange &&
               <div>
                <Button color="primary" className={'button'}  onClick={this.handleDateChange}
                >
                OK
              </Button>
                <Button color="primary" className={'button'}  onClick={this.closePopover}
                >
                Cancel
              </Button>
              </div>
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
              <FormControlLabel value="CheckIn" control={<Radio color="primary"/>} label="Arrivals" />
              <FormControlLabel value="CheckOut" control={<Radio color="primary"/>} label="Departures" />
            </RadioGroup>
          </FormControl>
          </div>
      </div>
    )
  }
}

export default Filters;


