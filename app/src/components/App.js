import { useState } from 'react';
import './style/vendor/_reset.css';
import './style/App.scss';
import Grid from './Grid';
import Controls from './Controls';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { OPTIONS } from './options';
import logo from './ext/logo.svg';

function App() {
  const [currentMaterial, setCurrentMaterial] = useState(OPTIONS.DEFAULT_MATERIAL);
  const [currentAlgorithm, setCurrentAlgorithm] = useState(OPTIONS.DEFAULT_ALGORITHM);

  const childProps = { currentMaterial, setCurrentMaterial, currentAlgorithm, setCurrentAlgorithm, }
  return (
    <div className="App">
      <div className="Header">
        <div
          className="logo-aside"
        >
          <img src={logo} alt="Another Generic PATH FINDER"/>
        </div>

        <Controls {...childProps} />
      </div>

        <DndProvider backend={HTML5Backend}>
          <Grid {...childProps} />
        </DndProvider>
    </div>
  );
}

export default App;
