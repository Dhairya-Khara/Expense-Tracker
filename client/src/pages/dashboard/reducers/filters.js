//FILTER REDUCER
import moment from 'moment'

//default state, no fulters
const filtersReucerDefaultState = {
    text: "",
    sortBy: "date",
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
}

const filterReducer = (state = filtersReucerDefaultState, action) => {
    switch (action.type) {
        case "SET_TEXT_FILTER":
            return{
                ...state,
                text:action.text
            }
        case "SORT_BY_AMOUNT":
            return{
                ...state,
                sortBy: action.sortBy
            }
        case "SORT_BY_DATE":
            return{
                ...state,
                sortBy: action.sortBy
            }
        case "SET_START_DATE":
            return{
                ...state,
                startDate: moment(action.startDate)
            }
        case "SET_END_DATE":
            return{
                ...state,
                endDate: moment(action.endDate)
            }
        case "RESET_STORE":
            return(filtersReucerDefaultState)
        default:
            return state;
    }
}

export default filterReducer