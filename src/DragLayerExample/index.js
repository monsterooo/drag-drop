import React from  'react';
import { DropTarget } from 'react-dnd';
import _ from 'lodash';
import type from './type';
import Item from './Item';
import Layer from './Layer';

const styles = {
  width: '100vw',
  height: '100vh'
}
class DragLayerExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragItems: [],
      items: [{
        uid: 1,
        type: 'text',
        title: 'Hello DnD',
        left: 0,
        top: 30,
        lastLeft: 0,
        lastTop: 30,
      }]
    }
  }
  setDrag = (uid) => {
    const dragItems = _.find(this.state.items, v => v.uid === uid);
    if (dragItems) this.setState({
      dragItems
    });
  }
  updateCurrentPosition = (uid, left, top) => {
    const find = _.find(this.state.items, v => v.uid === uid);
    if (!find) return false;
    find.left = left;
    find.top = top;
    this.setState({
      items: this.state.items
    });
  }
  updateLastPosition = (uid, left, top) => {
    const find = _.find(this.state.items, v => v.uid === uid);
    if (!find) return false;
    find.lastLeft = left;
    find.lastTop = top;
    this.setState({
      items: this.state.items
    });
  }
  render() {
    const { connectDropTarget, isOver } = this.props;
    const { items } = this.state;

    return (connectDropTarget(
      <div style={styles}>
        <Layer />
        {items.map(v => {
          return (
            <Item key={v.uid} setDrag={this.setDrag} updateLastPosition={this.updateLastPosition} {...v} />
          )
        })}
      </div>
    ))
  }
}

const specTarget = {
  drop: (props, monitor, component) => {
    const { dragItems } = component.state;
    // const differenceFromInitOffset = monitor.getDifferenceFromInitialOffset(); // 鼠标移动偏移量

    // component.updateLastPosition(
    //   dragItems.uid,
    //   dragItems.left,
    //   dragItems.top,
    // );
    // console.log('drop props > ', component)
  },
  hover: (props, monitor, component) => {
    // const { uid } = monitor.getItem();
    const { dragItems } = component.state;
    const initOffset = monitor.getInitialClientOffset();
    const offset = monitor.getClientOffset();
    const differenceFromInitOffset = monitor.getDifferenceFromInitialOffset(); // 鼠标移动偏移量

    component.updateCurrentPosition(
      dragItems.uid,
      dragItems.lastLeft + differenceFromInitOffset.x,
      dragItems.lastTop + differenceFromInitOffset.y,
    );

    // console.log('hover > ', initOffset, offset, differenceFromInitOffset);
    // console.log('hover > ', dragItems)
  },
  canDrop: (props, monitor) => {
    // console.log('canDrop > ', monitor.getItem());
  }
}
const collectTarget = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

export default DropTarget(type, specTarget, collectTarget)(DragLayerExample);