import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import reducer from './reducers'
import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

const store = createStore (
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware( thunk )
)

ReactDOM.render(
  <BrowserRouter>
    <Provider store = { store }>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();