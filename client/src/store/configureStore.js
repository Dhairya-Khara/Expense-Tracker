import { createStore, combineReducers } from 'redux'

import authReducer from '../pages/Landing Page/reducers/auth'
import expenseReducer from '../pages/dashboard/reducers/expense'
import filterReducer from '../pages/dashboard/reducers/filters'

import { persistReducer, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


//requirement to user redux-persist, redux store is preserved on page refresh
const persistConfig = {
    key: 'root',
    storage,

}

//persisted reducer, uses redux-persist to persist the following reducers on page close and refresh
const persistedReducer = persistCombineReducers(persistConfig, {
    filters: filterReducer,
    expenses: expenseReducer,
    auth: authReducer,

})

//REDUX STORE
const store = () => {

    const store = createStore(
        persistedReducer,
        // requirement to user redux dev tools
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )

    return store
}




export default (store)



