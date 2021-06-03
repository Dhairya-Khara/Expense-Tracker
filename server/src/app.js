const express = require('express')
var cors = require('cors')

const User = require('../database/userDatabase');
const auth = require('../middleware/auth');

const app = express()
const port = process.env.PORT || 8080

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Headers: X-Custom-Header')
//     next();
// });
app.use(cors())



app.post('/createUser', async (req, res) => {
    const firstName = req.query.firstName
    const lastName = req.query.lastName
    const email = req.query.email
    const password = req.query.password
    const objectWithInfo = {
        firstName,
        lastName,
        email,
        password
    }
    const user = new User(objectWithInfo)


    user.save().then(async (response) => {
        // const token = await user.generateAuthToken()
        // res.send({ user, token })
        res.send({user})
    }).catch((e) => {
        console.log(e)
    })

})

app.post('/loginUser', async (req, res) => {
    try {

        const user = await User.findByCredentials(req.query.email, req.query.password)
        const token = await user.generateAuthToken()

        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        })
        res.send({ user, token, auth: true })
    }
    catch (e) {
        res.status(400).send()
        console.log(e)
    }
})

app.post('/createExpense', auth, async (req, res) => {
 
    const user = await User.findByEmail(req.query.email)

    try {
        //save it
        const objectWithExpense = {
            description: req.query.description,
            amount: parseInt(req.query.amount),
            createdAt: parseInt(req.query.createdAt),
            note: req.query.note,
            id: req.query.id
        }
        

        const a = await User.updateOne({
            email: req.query.email
        }, {
            $push: {
                expenses: objectWithExpense
            }
        })
       
        // user.save()
    } catch (e) {
        console.log(e)
    }
})

app.get('/getExpenses', auth, async (req, res) => {
  
    const user = await User.findByEmail(req.query.email)
   
    res.send(user.expenses)
})

app.post('/logout', auth, async (req, res) => {
 
    const token = req.query.token
    const user = await User.findByEmail(req.query.email)

    user.tokens.forEach((eachItem) => {
      
        if (eachItem.token === token) {
          
            User.updateOne({
                email: req.query.email
            }, {
                $pull: {
                    tokens: eachItem
                }
            }).exec()
            
        }
    })
})

app.get('/singleExpense', auth, async(req,res)=>{
    const expenseId = req.query.id
    
    const user = await User.findByEmail(req.query.email)

   
    user.expenses.forEach((eachExpense)=>{
        if(eachExpense.id === expenseId){
           
            res.send({
                description: eachExpense.description,
                amount: eachExpense.amount,
                createdAt: eachExpense.createdAt,
                note: eachExpense.note
            })
           
        }
    })
})

app.patch('/updateExpense', auth, async(req,res)=>{

 

    const expenseId = req.query.id
    const user = await User.findByEmail(req.query.email)
    console.log(req.query.description)
    user.expenses.forEach((eachExpense)=>{
        if(eachExpense.id === expenseId){
            
            User.updateOne({
                email: req.query.email,
                id: eachExpense.id
            },
            {
                $set:{
                    "expenses.$.description": req.query.description,
                    "expenses.$.amount": req.query.amount,
                    "expenses.$.createdAt": req.query.createdAt,
                    "expenses.$.note": req.query.note
                }
            }), function(err){

            }
            res.send("edit success")
        }
    })
})



app.listen(port, () => {
    console.log("Started on port " + port)
})