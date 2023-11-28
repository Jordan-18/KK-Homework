import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Temp from './components/Temp';
import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Temp />
  </React.StrictMode>
);
reportWebVitals();
