import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from './item-types';
import ContainerIcons from './container-icons';

const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  },
};

class IconsBox extends Component {

  render() {
    const { isOver, canDrop, connectDropTarget } = this.props;
    const isActive = isOver && canDrop;

    let backgroundColor = 'rgb(243, 248, 249)';
    if (isActive) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    }

    return connectDropTarget(
      <div className="wrapper-container-icons" style={{ backgroundColor }}>
        <ContainerIcons icons={this.props.icons} moveIcon={this.props.moveIcon}/>
      </div>,
    );
  }
}

const connectTarget = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
})

export default (
  DropTarget(ItemTypes.ICONDRAG, dustbinTarget, connectTarget)(IconsBox)
)