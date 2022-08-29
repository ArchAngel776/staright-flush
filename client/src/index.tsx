import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import RootComponentException from './data/exception/RootComponentException'
import './css/index.css'

const rootDom = document.getElementById('root')

if (!rootDom) {
  throw new RootComponentException
}

const root = ReactDOM.createRoot(rootDom);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)