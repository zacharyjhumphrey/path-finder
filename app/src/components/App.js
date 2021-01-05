import { useState } from 'react';
import './style/vendor/_reset.css';
import './style/App.scss';
import Grid from './Grid';
import Controls from './Controls';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { OPTIONS } from './options';

function App() {
  const [currentMaterial, setCurrentMaterial] = useState(OPTIONS.DEFAULT_MATERIAL);

  const childProps = { currentMaterial, setCurrentMaterial }
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Grid {...childProps} />
      </DndProvider>

      <Controls {...childProps} />
    </div>
  );
}

export default App;
