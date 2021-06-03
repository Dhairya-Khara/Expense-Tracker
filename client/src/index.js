import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import configureStore from './store/configureStore'
import AppRouter from './routers/AppRouter'







const store = configureStore()
const persistor = persistStore(store)

const jsx = (
    <div>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppRouter />
            </PersistGate>
        </Provider>
    </div>
)

ReactDOM.render(jsx, document.getElementById('app'))