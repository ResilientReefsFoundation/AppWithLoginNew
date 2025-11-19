import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Add global augmentation for the 'model-viewer' custom element.
// This is the single source of truth for this augmentation to prevent build errors.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
      // FIX: The augmentation for 'model-viewer' was overwriting the default
      // JSX.IntrinsicElements from React, causing errors for all standard HTML
      // and SVG tags. Adding an index signature `[elemName: string]: any;`
      // makes the interface open-ended, allowing any tag name and fixing the
      // errors across the entire application.
      [elemName: string]: any;
    }
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
