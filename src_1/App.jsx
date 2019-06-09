import React, { Component } from 'react';
import { observer, observable, decorate } from 'mobx-react';
// import logo from './logo.svg';
import './App.css';
// import { indexData } from './store';
// import FunnelChart from './components/FunnelChart';
// import { funnelChartData } from './mock/mock';
// import Tarot from './components/Tarot';

// let mockData = funnelChartData;
@observable
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.upAction = this.upAction.bind(this);
    // this.indexData = this.props
  }
  upAction() {
    let { indexData } = this.props;
    indexData.upAction(123);
  }
  render() {
    let { indexData } = this.props;
    let {getList3rd, list} = indexData;
    console.log(this.props);
    return (
      <div className="App">
        {indexData.text}
        <a href="javascript:;" className="action-btn" onClick={this.upAction}>upup</a>
        {
          getList3rd.map(item => {
            return <p key={item}>{item}</p>
          })
        }
        <div>{indexData.addText}</div>
        {
          list.map(item => {
            return <p key={item}>{item}</p>
          })
        }
        {/* <header className="App-header">
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
        </header> */}
        {/* <FunnelChart data={mockData} percentStep={2} fixedType="floor" baseNum={undefined} noDataText="no data"></FunnelChart> */}
        {/* <Tarot></Tarot> */}
      </div>
    );
  }
}

export default App;
