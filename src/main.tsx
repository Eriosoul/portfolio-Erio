import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import App from './App';
import './i18n';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('No se encontró #root en index.html');

// ReactDOM.render (React 17) estaba deprecado en React 18: avisaba por consola
// y desactivaba el modo concurrente. createRoot es la API correcta.
createRoot(container).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
