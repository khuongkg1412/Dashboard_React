import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/css/bootstrap.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
const app = (
      <App />
);
root.render(app);

reportWebVitals();
