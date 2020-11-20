import { useState } from 'react';
import './style/vendor/_reset.css';
import './style/App.scss';
import Grid from './Grid';
import Controls from './Controls';

function App() {
  const defaultMaterial = 0;
  const [currentMaterial, setCurrentMaterial] = useState(defaultMaterial);

  const childProps = { currentMaterial, setCurrentMaterial }
  return (
    <div className="App">
      <Grid {...childProps} />
      <Controls {...childProps} />
    </div>
  );
}

export default App;
