import React from 'react';
import Select from 'react-select';
import Creatable from 'react-select/lib/Creatable';
import arrow from './arrow.svg';
import arrowNext from './arrow-next.svg';

const options = [
  { value: 'reservation', label: 'Reservation', arrowNext: true, optionsArray: [
    { value: 'r', label: 'Reservation', arrowBack: true },
    { value: 'qqq', label: 'qqqqqqq' },
    { value: 'ffffffff', label: 'ffffffffff' },    
  ] },
  { value: 'link', label: 'Link', arrowNext: true, optionsArray: [
    { value: 'l', label: 'Link', arrowBack: true },
    { value: 'dr', label: 'dr' },
    { value: 'eee', label: 'eee' },      
  ] },
];


const valueOption = {
  value: 'value',
  label: 'Value',
  arrowNext: true
}

const customStyles = {
  valueContainer: (base, state) => {
    const width = '120px';
    return {...base, width}
  },
  option: (base, state) => {
    const color = '#333333';
    const fontSize = '14px';
    let style = {...base, color, fontSize}
    if (state.data.arrowBack) {
        const backgroundImage = `url(${arrow})`
        const backgroundRepeat = 'no-repeat';
        const backgroundPosition = 'center left 12px';
        const paddingLeft = '28px';
        const fontSize = '12px';
        const fontWeight = 'bold';
        style = {...style, backgroundImage, backgroundPosition, paddingLeft, backgroundRepeat, fontSize, fontWeight}        
    }
    if (state.data.arrowNext) {
        const backgroundImage = `url(${arrowNext})`;
        const backgroundRepeat = 'no-repeat';
        const backgroundPosition = 'center right 13px';
        style = {...style, backgroundImage, backgroundRepeat, backgroundPosition}
    }
    return style
  }
}

class SelectByEntity extends React.Component {
  state = {
    selectedOption: null,
    options: this.props.options,
    status: 1,
    menuIsOpen: false
  }
  handleChange = (selectedOption) => {
    if (selectedOption.arrowNext) {
      if(selectedOption.optionsArray) {
        this.setState({ options: selectedOption.optionsArray});
      } else {
        this.setState({ menuIsOpen: false });
      }
    } else if (selectedOption.arrowBack) {
        this.setState({ options: this.props.options});
    } else {
        this.setState({ options: this.props.options, selectedOption, menuIsOpen: false });
        this.props.handleSelect(selectedOption)
    }
  }
  createOption = (string) => {
    const newOption = {label: string, value: 'newValue'};
    this.setState({ selectedOption: newOption, menuIsOpen: false });
    this.props.handleSelect(newOption)
  }

  render() {
    const { selectedOption, options } = this.state;
    return (
      this.props.creatable ?
         <Creatable
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          closeMenuOnSelect={false}
          menuIsOpen={this.state.menuIsOpen}
          onMenuOpen={() => {this.setState({menuIsOpen: true})}}
          onMenuClose={() => {this.setState({menuIsOpen: false})}}
          styles={customStyles}
          onCreateOption={this.createOption}
        /> :
         <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          closeMenuOnSelect={false}
          menuIsOpen={this.state.menuIsOpen}
          onMenuOpen={() => {this.setState({menuIsOpen: true})}}
          onMenuClose={() => {this.setState({menuIsOpen: false})}}
          styles={customStyles}
          isSearchable={false}
      /> 
    );
  }
}

export default SelectByEntity;
