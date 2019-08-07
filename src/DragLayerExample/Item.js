import React from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import type from './type';

const baseStyle = {
  position: 'absolute',
}
class Item extends React.Component {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }
  render() {
    const { connectDragSource, isDragging } = this.props;
    const opacity = isDragging ? 0 : 1;
    const { title, left, top } = this.props;
    return (connectDragSource(
      <div style={{ ...baseStyle, opacity, left, top }}>
        {title}
      </div>)
    )
  }
};

const specSource = {
  beginDrag: (props, monitor, component) => {
    const { setDrag, uid } = props;
    
    setDrag(uid);
    
    return props;
  },
  endDrag: (props, monitor, component) => {
    const { updateLastPosition, uid, left, top } = props;

    updateLastPosition(
      uid,
      left,
      top,
    );
    console.log('endDrag props > ', props)
  }
}
const collectSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview(),
  }
}


export default DragSource(type, specSource, collectSource)(Item);