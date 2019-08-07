import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DragLayerExample from './DragLayerExample';
import MoveableExample from './MoveableExample';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      {/* <DragLayerExample /> */}
      <MoveableExample />
    </DndProvider>
  );
}

export default App;
