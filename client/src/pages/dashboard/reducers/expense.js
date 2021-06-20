//EXPENSE REDUCER

//default state is an empty array, is filled up with each object which is a javascript objec
const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_EXPENSE":
            return [
                ...state, action.expense
            ]
        case "REMOVE_EXPENSE":
            return(state.filter(element=>element.id!==action.expense.id))
        case "EDIT_EXPENSE":
            return(state.map((expense)=>{
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates,

                    }
                }
                else{
                    return expense;
                }
            }))
        case "RESET_STORE":
            return(expensesReducerDefaultState)
        default:
            return state;
    }
}

export default expensesReducer