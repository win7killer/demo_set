import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FunnelChart from './components/FunnelChart';
import { funnelChartData } from './mock/mock';

let mockData = funnelChartData;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <FunnelChart data={mockData} percentStep={2} fixedType="floor" baseNum={undefined} noDataText="no data"></FunnelChart>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
