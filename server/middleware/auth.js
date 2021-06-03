const jwt = require('jsonwebtoken')
const User = require('../database/userDatabase')

const auth = async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
   
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const user = await User.findOne({_id: decoded._id, 'tokens.token':token})
      
        if(!user){
            console.log("throwing in auth")
            throw new Error()
            
        }    
        req.user = user;
        next()
    }catch(e){
        res.status(401).send({error: "Please Login"})
        console.log(e)
    }
}

module.exports = auth