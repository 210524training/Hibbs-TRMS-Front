import React from 'react';
import { Provider } from 'react-redux';
// All Components must import React from 'react' at the top of their module.
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import AppRoutes from './router/AppRoutes';
import store from './store';
import './style.css'

// There are 2 different kinds of Components: Class & Function
// This Component here is a Function Component
// For Function Components, you can structure them as regular functions or arrow functions
// Note that in TypeScript, the return type is not the same as the variable type of an arrow Function
const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Router>
        <div className="greenBox">
        <Navbar />
        <AppRoutes />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

/*
import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
*/