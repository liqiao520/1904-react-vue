import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from "react-redux";
import { MainRouter } from "&";
import store  from "./scripts/store"

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MainRouter />
      </Provider>
    </div>
  );
}

export default App;
