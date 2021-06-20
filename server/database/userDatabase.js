const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

var Schema = mongoose.Schema

var Schema = new Schema({
    email: {
        type: String,
        unique: true
    },
    firstName: {
        type:String
    },
    lastName:{
        type:String
    },  
    password:{
        type:String
    },
    tokens: [{
        token:{
            type: String,
            required:true
        }
    }],
    expenses:[]
})

//finding email to add expense to that user
Schema.statics.findByEmail = async(email)=>{
    const user = await User.findOne({email})
    return user;
}

//finding to login
Schema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email})
   
    if(!user){
        throw new Error('Unable to Login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
       
        throw new Error('Unable to Login')
    }
    return user
}

Schema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user.id.toString()}, 'thisismynewcourse')

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//hash plain text password
Schema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

let User = mongoose.model('User', Schema)



mongoose.connect('mongodb://127.0.0.1:27017/user', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

module.exports = User
