import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind or custom styles

import App from './App';

// Create a root element for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

