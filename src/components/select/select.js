import React from 'react';
import Select from 'react-select';

const customStyles = {
  valueContainer: (base, state) => {
    const width = '120px';
    return {...base, width}
  },
  option: (base, state) => {
    const color = '#333333';
    const fontSize = '14px';
    let style = {...base, color, fontSize}
    return style
  }
}
class SelectBox extends React.Component {
  state = {
    selectedOption: this.props.selectedOption,
  }
  handleChange = (selectedOption) => {
    this.setState({selectedOption});
    this.props.handleSelect(selectedOption)
  }
  render() {
    const { selectedOption } = this.state;
    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={this.props.options}
        styles={customStyles}
      />
    );
  }
}

export default SelectBox;
