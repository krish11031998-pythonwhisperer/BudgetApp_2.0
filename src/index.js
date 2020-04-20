import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Import F7 Bundle
import Framework7 from 'framework7-react/framework7-react.bundle';

// Import F7-React Plugin
import Framework7React from 'framework7-react';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
