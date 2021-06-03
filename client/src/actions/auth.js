//Change Authentication

// export const changeAuth = (auth = false, email)=>{
//     return{
//         type: "SET_AUTH",
//         auth,
//         email
//     }
// }
export const changeAuth = (auth = false, email, token)=>{
    return{
        type: "SET_AUTH",
        auth,
        email,
        token
      
    }
}