import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import './Filters.scss';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      range: 7,
      value: 'All',
    };
  }
  

  handleSelectChange = event => {
    this.setState({ range: event.target.value });
    this.props.onChangeRange(event.target.value);
  };

  handleRadioChange = event => {
    this.setState({ value: event.target.value });
    this.props.onChangeStatus(event.target.value);
  };

  render() {
    return (
      <div className="filters">
          <div className="date-range">
            <div className="rangeTxt">DATE RANGE</div>
            <Select
              variant="outlined"
              value={this.state.range}
              onChange={this.handleSelectChange}>
              <MenuItem value={7}>1 week</MenuItem>
              <MenuItem value={14}>2 weeks</MenuItem>
              <MenuItem value={30}>1 month</MenuItem>
              <MenuItem value={1}>custom</MenuItem>
            </Select>
          </div>
          <div className="filter">
            <FormControl component="fieldset" className="formControl">
            <RadioGroup
              aria-label="Gender"
              name="gender1"
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
