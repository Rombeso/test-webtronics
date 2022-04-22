import React from 'react';
import './App.css';
import Routes from './routes/Routes';
import {Massage} from "./components/Massage/Massage";

function App() {
  return (
    <div className="App">
        <Routes />
        <Massage />
    </div>
  );
}

export default App;
