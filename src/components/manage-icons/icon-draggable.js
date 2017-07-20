import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './item-types';

const iconSource = {
  beginDrag(props) {
    return props.data
  }
};


class IconDraggable extends Component {
  render() {
    const { isDragging, connectDragSource } = this.props;
    const { data } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      connectDragSource(
        <div style={{ opacity }} className="icon-draggable">
          <img src={data.field_icon} alt="icon" />
          <div>{data.name}</div>
          <span className="tooltiptext" dangerouslySetInnerHTML={{__html: data.description__value}}></span>
        </div>,
      )
    );
  }
}


const connectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

export default (
  DragSource(ItemTypes.ICONDRAG, iconSource, connectSource)(IconDraggable)
)
