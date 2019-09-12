import React, { Component } from 'react';
import Easel from './components/Easel';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>v0.0.1 Swatches Alpha Testing</p>
        <Easel />
      </div>
    );
  }
}

export default App;
