import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import configureStore from './Store/PizzaAppStore';
import { Frame } from './Components/Frame';

export default function App() {
  return (
    <Provider store={configureStore()}>
      <div className="App">
        <Frame />
      </div>
    </Provider>
  );
}
