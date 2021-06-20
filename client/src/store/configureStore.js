import { createStore, combineReducers } from 'redux'

import authReducer from '../pages/Landing Page/reducers/auth'
import expenseReducer from '../pages/dashboard/reducers/expense'
import filterReducer from '../pages/dashboard/reducers/filters'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

//requirement to user redux-persist, redux store is preserved on page refresh
const persistConfig = {
    key: 'root',
    storage,
}
//requirement to user redux-persist, redux store is preserved on page refresh
const persistedAuthReducer = persistReducer(persistConfig, authReducer)


const store = () => {

    const store = createStore(
        combineReducers({
            auth:persistedAuthReducer,
            expenses: expenseReducer,
            filters: filterReducer
        }),
        // requirement to user redux dev tools
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

    return store
}

export default (store)



