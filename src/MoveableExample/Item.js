import React from 'react';
import { createSelectable } from "react-selectable-fast";

function Item({ title, style, onMouseDown, onMouseUp, selectableRef, selected, selecting }) {
  return (
    <div
      ref={selectableRef}
      className={`
        item
        ${selecting ? 'selecting' : ''}
        ${selected ? 'selected' : ''}
      `}
      style={{...style}}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {title}
    </div>
  )
}

export default createSelectable(Item);