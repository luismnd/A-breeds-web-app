import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App.js';
import {Provider} from 'react-redux';
import {store} from './Redux/store/index.js'

ReactDOM.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <BrowserRouter>
        <div className="body">
          <App />
        </div>
      </BrowserRouter>
    {/* </React.StrictMode> */}
   </Provider>,
  document.getElementById('root')
);
