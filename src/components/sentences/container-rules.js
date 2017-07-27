import React, { Component } from 'react';
import RuleSortable from './rule-sortable';


class ContainerRules extends Component {

  render() {
    const { rules } = this.props;

    return (
      <div className="container">
        <div className="rules">
        {rules.map((rule, i) => (
          <RuleSortable
            key={rule._id}
            index={i}
            id={rule._id}
            rule={rule}
            moveRule={this.props.moveRule}
            deleteRule={this.props.deleteRule}
            editRule={this.props.editRule}
          />
        ))}
        </div>
      </div>
    );
  }
}

export default ContainerRules