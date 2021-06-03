

//ADD_EXPENSE
export const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0, id = 0} = {}) => {
    return {
        type: "ADD_EXPENSE",
        expense: {
            id,
            description,
            note,
            amount,
            createdAt
        }
    }
}

//REMOVE_EXPENSE
export const removeExpense = (id) => {
  
    return {
        type: "REMOVE_EXPENSE",
        expense: {
            id
        }
    }
}

//EDIT_EXPENSE
export const editExpense = (id, updates) =>{
    return{
        type: "EDIT_EXPENSE",
        id,
        updates
    }
}

//RESET_STORE
export const resetExpenseReducer=()=>{
    return{
        type: "RESET_STORE"
    }
}