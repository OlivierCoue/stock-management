import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'
import 'normalize.css/normalize.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from './store'
import App from './app'

// Entry point of the App in the DOM
render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  window.document.getElementById('app')
)

// Hot Module Replacement
if (module.hot) module.hot.accept()
