import React from 'react';
import './CheckList.scss';

class CheckList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }


  render() {
    console.log('5555',this.props.actions)
    const {actions} = this.props;
    console.log('66666',actions)
    return (
      <div className="list">
        {actions.map((index,  key) =>
          actions[key].actionsList.map((index,  key1) =>
          <div key={key1} className="green">{index.title}</div>
          )
          )}
        <div className="green">Reservation Created</div>
        <div className="red">Reservation connected to App</div>
        <div className="gray">Credit Card authorized</div>
        <div className="green">Key Issue</div>
        <div className="green">Reservation Created</div>
      </div>
    )
  }
}

export default CheckList;
