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
  const [playerData, setPlayerData] = useState({
    pos: {
      x: OPTIONS.DEFAULT_PLAYER_CELL.x * OPTIONS.CELL_SIZE + OPTIONS.DEFAULT_PLAYER_CELL.x * OPTIONS.CELL_BORDER_SIZE * 2,
      y: OPTIONS.DEFAULT_PLAYER_CELL.y * OPTIONS.CELL_SIZE + OPTIONS.DEFAULT_PLAYER_CELL.y * OPTIONS.CELL_BORDER_SIZE * 2,
    },
    cell: OPTIONS.DEFAULT_PLAYER_CELL,
    passableMaterials: ['Empty-Cell', 'Player-Cell', 'Goal-Cell'],
  });

  const addPassableMaterial = (mat) => {
    let newPlayer = playerData;
    newPlayer.passableMaterials.push(mat);
    setPlayerData(newPlayer);
  }

  const removePassableMaterial = (mat) => {
    let newPlayer = playerData;
    newPlayer.passableMaterials.filter(i => i !== mat);
    setPlayerData(newPlayer);
  }


  const childProps = { currentMaterial, setCurrentMaterial, currentAlgorithm, setCurrentAlgorithm, playerData, setPlayerData }
  const controlsProps = {
    currentMaterial, 
    setCurrentMaterial, 
    currentAlgorithm, 
    setCurrentAlgorithm, 
    playerData, 
    setPlayerData,
    addPassableMaterial, 
    removePassableMaterial
  }
  return (
    <div className="App">
      <div className="Header">
        <div
          className="logo-aside"
        >
          <img src={logo} alt="Another Generic PATH FINDER"/>
        </div>

        <Controls {...controlsProps} />
      </div>

        <DndProvider backend={HTML5Backend}>
          <Grid {...childProps} />
        </DndProvider>
    </div>
  );
}

export default App;
