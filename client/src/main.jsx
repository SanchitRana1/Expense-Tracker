import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'

import {persistor, appStore} from "./utils/appStore.js";
import { PersistGate } from 'redux-persist/lib/integration/react.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Provider store={appStore}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>

    </Provider>
  </React.StrictMode>,
)
