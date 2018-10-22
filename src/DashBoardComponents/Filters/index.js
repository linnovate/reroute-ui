import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import './Filters.css';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
 });


class Filters extends React.Component {
  
  state = {
    time: '',
    name: 'hai',
    value: 'female',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleRadioChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div className="filters">
          <div className="date-range">
            <Select
              value={this.state.time}
              onChange={this.handleChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <div className="rangeTxt">DARE RANGE</div>
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
              <FormControlLabel value="female" control={<Radio color="white"/>} label="Female" />
              <FormControlLabel value="male" control={<Radio color="white"/>} label="Male" />
              <FormControlLabel value="other" control={<Radio color="white"/>} label="Other" />
            </RadioGroup>
          </FormControl>
          </div>
      </div>
    )
  }
}

export default Filters;
