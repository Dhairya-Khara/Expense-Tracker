import { createStore, combineReducers } from 'redux'

import authReducer from '../pages/Landing Page/reducers/auth'
import expenseReducer from '../pages/dashboard/reducers/expense'
import filterReducer from '../pages/dashboard/reducers/filters'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage,
}
const persistedAuthReducer = persistReducer(persistConfig, authReducer)


const store = () => {

    const store = createStore(
        combineReducers({
            // auth: authReducer,
            auth:persistedAuthReducer,
            expenses: expenseReducer,
            filters: filterReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

    return store
}

export default (store)



