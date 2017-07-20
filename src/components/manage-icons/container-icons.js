import React, { Component } from 'react';
import IconSortable from './icon-sortable';


class ContainerIcons extends Component {

  render() {
    const { icons } = this.props;
    return (
      <div className="container-icons">
        {icons.map((icon, i) => (
          <IconSortable
            key={icon.name}
            index={i}
            id={icon.name}
            data={icon}
            moveIcon={this.props.moveIcon}
          />
        ))}
      </div>
    );
  }
}

export default ContainerIcons