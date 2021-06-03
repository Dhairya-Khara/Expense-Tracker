const authReducerDefaultState = {
    authenticated: false
}

export const authReducer = (state = authReducerDefaultState, action)=>{
    switch(action.type){
        case "SET_AUTH":
            return{
                ...state,
                authenticated: action.auth,
                email: action.email,
                token: action.token
            }
        default:
            return state
    }
}

export default authReducer