import React from 'react';
import AddBtn from '../add-btn/add-btn';
import SelectByEntity from '../select-byEntity/select-byEntity';
import SelectBox from '../select/select';
import './style.css';


const signOptions = [
  {value: 'equal', label: 'equal'},
  {value: 'does not equal', label: 'does not equal'}
]
const firstOptions = [
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
const secondOptions = [
  {value: 'value', label: 'Value', arrowNext: true},
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

class Conditions extends React.Component {
  state = {
    list: []
  }
  componentWillReceiveProps(nextProps) {
    this.setState({list: nextProps.conditions || []})
  }
  getConditions = () => {
    return this.state.list;
  }
  addCondition = () => {
    this.setState(state => ({
      list: [...state.list, {}]
    }));
  }
  handleFirstSelect = (selected, i) => {
    const conditions = this.state.list;
    conditions[i].first = selected;
    conditions[i].sign = true;
    this.setState({list: conditions});
  }
  handleSecondSelect = (selected, i) => {
    const conditions = this.state.list;
    conditions[i].second = selected;
    this.setState({list: conditions});
  }
  addSecondSelect = (selected, i) => {
    const conditions = this.state.list;
    conditions[i].sign = selected;
    conditions[i].second = conditions[i].second || true;
    this.setState({list: conditions});
  }
  render() {
    return (
      <div className="conditions">
        {
          this.state.list.map((q, i) => <div className="condition" key={i}>
            <SelectByEntity selectedOption={q.first} options={firstOptions} handleSelect={(selected) => this.handleFirstSelect(selected, i)} />
            {q.sign && <SelectBox selectedOption={q.sign} options={signOptions} handleSelect={(selected) => this.addSecondSelect(selected, i)} />}
            {q.second && <SelectByEntity selectedOption={q.second} options={secondOptions} creatable handleSelect={(selected) => this.handleSecondSelect(selected, i)} />}
          </div>)
        }
        <AddBtn handleClick={this.addCondition} />
      </div>
    )
  }
}

export default Conditions;