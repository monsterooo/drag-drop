import React from 'react';
import Moveable from "react-moveable";

function MoveableItem({ onDrag, onDragEnd }) {
  return <Moveable
    target={document.querySelector(".box")}
    container={null}
    origin={true}

    /* draggable */
    draggable={true}
    throttleDrag={0}
    onDragStart={({ target, clientX, clientY }) => {
        console.log("onDragStart", target);
    }}
    onDrag={({
        target,
        beforeDelta, beforeDist,
        left, top,
        right, bottom,
        delta, dist,
        transform,
        clientX, clientY,
    }) => {
      const x = dist[0];
      const y = dist[1];
      target.style.transform = transform;
      onDrag && onDrag(x, y);
    }}
    onDragEnd={({ target, isDrag, clientX, clientY }) => {
        console.log("onDragEnd", target, isDrag);
        onDragEnd && onDragEnd();
    }}

    keepRatio={true}
    resizable={true}
    throttleResize={0}
    onResizeStart={({ target , clientX, clientY}) => {
        console.log("onResizeStart", target);
    }}
    onResize={({
        target, width, height,
        dist, delta,
        clientX, clientY,
    }) => {
      console.log("onResize", target);
      delta[0] && (target.style.width = `${width}px`);
      delta[1] && (target.style.height = `${height}px`);
    }}
    onResizeEnd={({ target, isDrag, clientX, clientY }) => {
      console.log("onResizeEnd", target, isDrag);
    }}

    // scalable={true}
    // throttleScale={0}
    // onScaleStart={({ target, clientX, clientY }) => {
    //     console.log("onScaleStart", target);
    // }}
    // onScale={({
    //     target, scale, dist, delta, transform,
    //     clientX, clientY,
    // }) => {
    //     console.log("onScale scale", scale);
    //     target.style.transform = transform;
    // }}
    // onScaleEnd={({ target, isDrag, clientX, clientY }) => {
    //     console.log("onScaleEnd", target, isDrag);
    // }}
  />
}

export default MoveableItem;