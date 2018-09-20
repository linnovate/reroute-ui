import React from 'react';
import AddBtn from '../add-btn/add-btn';
import SelectBox from '../select/select';
import './style.css';

export default class Entities extends React.Component {
  state = {
    list: []
  }
  componentWillReceiveProps(nextProps) {
    this.setState({list: nextProps.entities || []})
  }
  handleSelect = (selected, index) => {
    const list = this.state.list;
    list[index] = selected;
    this.setState({list})
    this.props.selectEntity(selected)
  }
  addEntity = () => {
    const list = this.state.list;
    list.push('');
    this.setState({list});   
  }
  render() {
    return (
      <div className="entities">
        {this.state.list.map((item, index) => 
          <SelectBox key={index} selectedOption={item} options={this.props.entitiesOptions} handleSelect={(selected) => this.handleSelect(selected, index)} />
        )}
        <AddBtn handleClick={this.addEntity}/>
      </div>
    )
  }
}