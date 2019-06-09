import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { observer } from 'mobx-react';
import { indexData } from './store';
// @observer
// class App1 extends React.Component {
//     render() {
//         let {indexData} = this.props;
//         return <div className="app-box">
//             {indexData.text}
//         </div>
//     }
// }

ReactDOM.render(<App indexData={indexData}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
