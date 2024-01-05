import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TranReducer from './store/TranReducer';



const store= configureStore({
  reducer:{
    trans:TranReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
  <App />
  </Provider>
   
  </React.StrictMode>
);

