const express = require('express')
var cors = require('cors')

const User = require('../database/userDatabase');
const auth = require('../middleware/auth');

const app = express()
const port = process.env.PORT || 8080

//required because client hosted on post 3000 and server hosted on port 8080
app.use(cors())


//api endpoint for registering user
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
        res.send({ user })
    }).catch((e) => {
       res.send(false)
    })

})

//api endpoint to log user in 
app.post('/loginUser', async (req, res) => {
    try {

        //const user = await User.findByCredentials(req.query.email, req.query.password)
     
        const userInfo = {
            email: req.query.email,
            name: req.query.name
        }

     

        const user = await User.logUserInUsingGoogle(userInfo)
        const token = await user.generateAuthToken()

        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        })
        res.send({ user, token, auth: true })
    }
    catch (e) {
        res.send(false)

        console.log(e)
    }
})

//api endpoint to create expense for user, auth required
app.post('/createExpense', auth, async (req, res) => {
    const user = req.user

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

    
    } catch (e) {
        console.log(e)
    }
})

//api endpoint to get all the expenses of the user to render on dashboard, auth required
app.get('/getExpenses', auth, async (req, res) => {
    const user = req.user
    res.send(user.expenses)
})

//api endpoint to log user out, auth required
app.post('/logout', auth, async (req, res) => {

    const token = req.query.token
    const user = req.user

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

//api endpoint to get a single expense, used for editting individual expense, auth required
app.get('/singleExpense', auth, async (req, res) => {
    const expenseId = req.query.id

    const user = req.user


    user.expenses.forEach((eachExpense) => {
        if (eachExpense.id === expenseId) {

            res.send({
                description: eachExpense.description,
                amount: eachExpense.amount,
                createdAt: eachExpense.createdAt,
                note: eachExpense.note
            })

        }
    })
})

//api endpoint to update a single expense, auth required
app.patch('/updateExpense', auth, async (req, res) => {
    const expenseId = req.query.id
    User.updateOne({
        email: req.query.email,
        "expenses.id": expenseId
    },
        {
            $set: {
                "expenses.$.description": req.query.description,
                "expenses.$.amount": parseInt(req.query.amount)*1000,
                "expenses.$.createdAt": parseInt(req.query.createdAt),
                "expenses.$.note": req.query.note
            }
        }).exec()
})

//api endpoint to delete the chosen expense, auth rquired
app.post('/deleteExpense', auth, async(req,res)=>{
 
    const expenseId = req.query.id
    const user = req.user

    user.expenses.forEach((eachItem) => {
        
        if (eachItem.id === expenseId) {
          
            User.updateOne({
                email: req.query.email
            }, {
                $pull: {
                    expenses: eachItem
                }
            }).exec()

        }
    })

})




app.listen(port, () => {
    console.log("Started on port " + port)
})



