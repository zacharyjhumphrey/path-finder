import { useState } from 'react';
import './style/App.scss';
import Grid from './Grid';
import Controls from './Controls';

function App() {
  const defaultControls = {
    material: 0
  }

  const [controls, setControls] = useState(defaultControls);

  const childProps = { controls, setControls }
  return (
    <div className="App">
      <Grid {...{ ...controls, setControls }} />
      <Controls {...childProps} />
    </div>
  );
}

export default App;
