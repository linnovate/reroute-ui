import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import Divider from 'material-ui/Divider';
import update from 'react/lib/update';
import ItemTypes from './item-types';
import IconsBox from './iconsBox';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

class Card extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      icons: []
    }
  }

  handleDrop = (item) => {
    this.setState(update(this.state, {
      icons: {
        $push: [item],
      }
    }));
  }

  moveIcon = (dragIndex, hoverIndex) => {
    const { icons } = this.state;
    const dragIcon = icons[dragIndex];

    this.setState(update(this.state, {
      icons: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragIcon],
        ],
      },
    }));
  }



  render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div className="room" style={{ opacity }}>
        <div>{text}</div>
        <Divider />
        <IconsBox
            onDrop={item => this.handleDrop(item)}
            icons={this.state.icons}
            moveIcon={this.moveIcon}
        />
      </div>,
    ));
  }
}

const connectTarget = connect => ({
  connectDropTarget: connect.dropTarget()
})

const connectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

export default (
  DropTarget(ItemTypes.CARD, cardTarget, connectTarget)(
    DragSource(ItemTypes.CARD, cardSource, connectSource)(
      Card
    )
  )
)