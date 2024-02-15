import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  Provider
} from 'react-redux'
import { AuthContextProvider } from 'contexts/authContext'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './styles/all.sass'
import './i18n'
import 'assets/mock/index'
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Provider>
)

reportWebVitals()
