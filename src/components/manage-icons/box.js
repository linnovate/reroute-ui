import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from './item-types';



const boxSource = {
  beginDrag(props) {
    return props.data
  }
};


class Box extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  };

  render() {
    const { isDragging, connectDragSource } = this.props;
    const { data } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      connectDragSource(
        <div style={{ opacity }}>
          <img src={data.field_icon} />
          <div>{data.name}</div>
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
  DragSource(ItemTypes.BOX, boxSource, connectSource)(Box)
)