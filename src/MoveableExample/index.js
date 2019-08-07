import React from 'react';
import { SelectableGroup } from "react-selectable-fast";
import _ from 'lodash';
import cn from 'classnames';
import Item from './Item';
import MoveableItem from './MoveableItem';

const wrapStyle = {
  width: '100vw',
  height: '100vh'
}

class MoveableExample extends React.Component {
  constructor(props) {
    super(props);
    this.moveable = null;
    this.state = {
      selectedItems: [],
      items: [
        {
          uid: 1,
          left: 100,
          top: 100,
          lastLeft: 100,
          lastTop: 100,
          title: 'Monsterooo'
        },
        {
          uid: 2,
          left: 220,
          top: 220,
          lastLeft: 220,
          lastTop: 220,
          title: 'Yoho!'
        }
      ]
    }
    this.ref = React.createRef();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedItems !== this.state.selectedItems) {
      this.updateBox();
    }
  }
  handleCreate = () => {
    const items = Array.from(document.querySelectorAll('.item'));
    let it = 0, il = 0, ir = 0, ib = 0, at = 0, al = 0, ar = 0, ab = 0;

    items.forEach((v, i) => {
      const rect = v.getBoundingClientRect();
      
      if (i === 0) {
        it = rect.top;
        il = rect.left;
        ir = rect.left + rect.width;
        ib = rect.top + rect.height;
        at = rect.top;
        al = rect.left;
        ar = rect.left + rect.width;
        ab = rect.top + rect.height;
        return;
      }
      
      it = Math.min(rect.top, it);
      il = Math.min(rect.left, il);
      ir = Math.min(rect.left + rect.width, ir);
      ib = Math.min(rect.top + rect.height, ib);
      
      at = Math.max(rect.top, at);
      al = Math.max(rect.left, al);
      ar = Math.max(rect.left + rect.width, ar);
      ab = Math.max(rect.top + rect.height, ab);
    })
    const x = il;
    const y = it;
    const width = ar - x;
    const height = ab - y;
    this.box.style.left = x + 'px';
    this.box.style.top = y + 'px';
    this.box.style.width = width + 'px';
    this.box.style.height = height + 'px';
  }
  handleDestroy = (e) => {
  
  }
  getEl = e => {
    this.box = this.box || e;
  }
  updateBox = () => {
    const { selectedItems } = this.state;
    let it = 0, il = 0, ir = 0, ib = 0, at = 0, al = 0, ar = 0, ab = 0;
    if (!selectedItems || !selectedItems.length) {
      this.box.style.display = 'none';
      this.box.style.transform = 'none';
      this.setState({ moveable: false });
      return;
    }
    selectedItems.forEach((v, i) => {
      if (i === 0) {
        it = v.bounds.top;
        il = v.bounds.left;
        ir = v.bounds.left + v.bounds.computedWidth;
        ib = v.bounds.top + v.bounds.computedHeight;
        at = v.bounds.top;
        al = v.bounds.left;
        ar = v.bounds.left + v.bounds.computedWidth;
        ab = v.bounds.top + v.bounds.computedHeight;
        return;
      }
      
      it = Math.min(v.bounds.top, it);
      il = Math.min(v.bounds.left, il);
      ir = Math.min(v.bounds.left + v.bounds.computedWidth, ir);
      ib = Math.min(v.bounds.top + v.bounds.computedHeight, ib);
      
      at = Math.max(v.bounds.top, at);
      al = Math.max(v.bounds.left, al);
      ar = Math.max(v.bounds.left + v.bounds.computedWidth, ar);
      ab = Math.max(v.bounds.top + v.bounds.computedHeight, ab);
    })
    const x = il;
    const y = it;
    const width = ar - x;
    const height = ab - y;
    this.box.style.display = 'block';
    this.box.style.left = x + 'px';
    this.box.style.top = y + 'px';
    this.box.style.width = width + 'px';
    this.box.style.height = height + 'px';
    this.setState({ moveable: true });
  }
  onMouseUp = e => {
    console.log('up')
  }
  getMoveable = e => {
    console.log('>> ', e)
  }
  handleSelecting = (selectingItems) => {
    // console.log('选中元素 > ', selectingItems);
  }
  handleSelectionClear = () => {

  }
  handleSelectionFinish = (selectedItems) => {
    this.setState({
      selectedItems: selectedItems,
    });
  }
  handleBoxDrag = (x, y) => {
    const { selectedItems, items } = this.state;
    
    _.each(selectedItems, v => {
      const uid = _.get(v, 'props.uid');
      const find = _.find(items, i => i.uid === uid);
      find.left = find.lastLeft + x;
      find.top = find.lastTop + y;
    })
    this.setState({ items });
  }
  handleBoxDragEnd = () => {
    const { selectedItems, items } = this.state;

    _.each(selectedItems, v => {
      const uid = _.get(v, 'props.uid');
      const find = _.find(items, i => i.uid === uid);
      find.lastLeft = find.left;
      find.lastTop = find.top;
    })
    this.setState({ items });
    this.box.classList.add('.selected');
  }
  render() {
    const { items, moveable, selectedItems } = this.state;
    const boxCN = cn('box', { 'selected': selectedItems.length });

    return (
      <div style={wrapStyle}>
        { moveable ?
          <MoveableItem
            onDrag={this.handleBoxDrag}
            onDragEnd={this.handleBoxDragEnd}
          /> : null
        }
        <button onClick={this.handleDestroy}>取消</button>
        <button onClick={this.handleCreate}>创建</button>

        <div className={boxCN} style={{display: 'none'}} ref={this.getEl}></div>
        
        <SelectableGroup
          ref={ref => (window.selectableGroup = ref)}
          className="main"
          enableDeselect
          mixedDeselect
          resetOnStart
          tolerance={0}
          deselectOnEsc={false}
          allowClickWithoutSelected={false}
          duringSelection={this.handleSelecting}
          onSelectionClear={this.handleSelectionClear}
          onSelectionFinish={this.handleSelectionFinish}
        >
          {items.map((v, i) => {
            return (
              <Item key={i} {...v} style={{ top: v.top, left: v.left }} />
            )
          })}
        </SelectableGroup>
      </div>
    )
  }
}

export default MoveableExample;