import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import configureStore from './store/configureStore'
import AppRouter from './routers/AppRouter'

import 'normalize.css/normalize.css';
import './styles/styles.scss'

const store = configureStore()
const persistor = persistStore(store)

const jsx = (
    <div>
        <Provider store={store}>
        {/* Persist Gate - requirement to user redux-persist, redux store is preserved on page refresh */}
            <PersistGate loading={null} persistor={persistor}>
                <AppRouter />
            </PersistGate>
        </Provider>
    </div>
)

ReactDOM.render(jsx, document.getElementById('app'))