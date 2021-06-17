//Actions for the Authentication reducer

//changes auth from true to false depending on situation, is also involved in sending the appropriate email and jwt token when asked for it
export const changeAuth = (auth = false, email, token)=>{
    return{
        type: "SET_AUTH",
        auth,
        email,
        token
      
    }
}