import React from 'react'
import ExpenseForm from './ExpenseForm'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'



class AddExpensePage extends React.Component {
    constructor(props){
        super(props)
    }

    callAPI = ({description, createdAt, amount, note})=>{
        const id = uuidv4()
        let url = "http://localhost:8080/createExpense?description="
        +encodeURIComponent(description)+"&createdAt="+encodeURIComponent(createdAt)+"&amount="
        +encodeURIComponent(amount)+"&note="+encodeURIComponent(note)+"&email="+encodeURIComponent(this.props.email)+"&id="
        +encodeURIComponent(id)
        
       
        let h = new Headers({
            "Authorization": this.props.token
        })
        let req = new Request(url, {
            method: "POST",
            headers: h
        })
        fetch(req).then(async(response, error)=>{
            if(error){
                console.log("error")
                console.log(error)
            }
            console.log(await response)
        })
    }

    render() {
        if(this.props.auth === true){
            return (
    
                <div>
                    <h1>Add Expense</h1>
                    <ExpenseForm onSubmit={(expense) => {
                        
                  
                        this.callAPI(expense)   
                        setTimeout(()=>{
                            this.props.history.push('/dashboard')
                        }, 10)
                        
                    }} />
                </div>
            )
        }
        else if(this.props.auth === false ){
            return(
                <div>
                    <p>Please Log in</p>
                </div>
            )
        }

    }
}

const mapStateToProps= (state)=>{
    return{
        email: state.auth.email,
        token: state.auth.token,
        auth: state.auth.authenticated,
    }
}

export default connect(mapStateToProps)(AddExpensePage)