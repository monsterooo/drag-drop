import React from 'react';
import { DragLayer } from 'react-dnd';
import type from './type';

const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  color: 'green',
};

const getItemStyles = currentOffset => {
  if (!currentOffset) {
    return {
      display: "none"
    };
  }
  const { x, y } = currentOffset;
  return {
    transform: `translate(${x}px, ${y}px)`,
  };
};

class Layer extends React.Component {
  render() {
    const { itemType, item, currentOffset, isDragging } = this.props;

    if (itemType !== type) return null;
    
    if (!isDragging) {
      return null;
    }

    console.log('layer > ', item);
    return (
      <div style={layerStyles}>
        <div style={getItemStyles(currentOffset)}>
          {item.title}
        </div>
      </div>
    )
  }
}

const collectLayer = monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
});

export default DragLayer(collectLayer)(Layer);