export const setTextFilter = (text = '')=>{
    return{
        type: "SET_TEXT_FILTER",
        text
    }
}

export const sortByAmount = (sortBy = "amount")=>{
    return{
        type: "SORT_BY_AMOUNT",
        sortBy
    }
}

export const sortByDate = (sortBy = "date")=>{
    return{
        type: "SORT_BY_DATE",
        sortBy
    }
}

export const setStartDate = (startDate = undefined) =>{
    return{
        type: "SET_START_DATE",
        startDate
    }
}

export const setEndDate = (endDate = undefined)=>{
    return{
        type: "SET_END_DATE",
        endDate
    }
}

export const resetFilterReducer = ()=>{
    return{
        type: "RESET_STORE"
    }
}