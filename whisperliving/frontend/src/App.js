import logo from './logo.svg';
import React from 'react';
import PlantaBaja from './components/PlantaBaja/PlantaBaja';
import SegundoPiso from './components/SegundoPiso/SegundoPiso';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Casa Domótica</h1>
      <PlantaBaja />
      <SegundoPiso />
    </div>
  );
}

export default App;
