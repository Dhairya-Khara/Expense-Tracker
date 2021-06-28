import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

import ExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters'
import { addExpense, resetExpenseReducer } from '../actions/expenses'
import selectedExpenses from '../selectors/expenses'


import Header from './Header'

class ExpenseListDashboard extends React.Component {
    constructor(props) {
        super(props)

        

        if (props.auth === false) {
            props.history.push("/")
        }

        //clearing reduce expenser before filling it up from the database to avoid duplicate data
        this.props.dispatch(resetExpenseReducer())

        //calling api to get all the expenses
        const url = "http://localhost:8080/getExpenses?email=" + encodeURIComponent(props.email)
        let h = new Headers({
            "Authorization": "Bearer " + props.token
        })

        let req = new Request(url, {
            headers: h
        })

        fetch(req).then((response) => {
            response.json().then((data) => {
                //filling the expenses in the reducer one by one
                for (let i = 0; i < data.length; i++) {

                    this.props.dispatch(addExpense({ description: data[i].description, note: data[i].note, amount: parseInt(data[i].amount), createdAt: parseInt(data[i].createdAt), id: data[i].id }))


                }

            })
        })
        
        
        
    }

    renderSubtitle = ()=>{
        if(this.props.expenses[0] &&(this.props.expenses).length <= 0){
         
            return "Viewing 0 expenses totalling $0.00"
        }
        else if((this.props.expenses).length === 1){ 
           
            return "Viewing 1 expense totalling $" +this.props.expenses[0].amount
        }
        let totalAmount = 0
        for(let i = 0; i<= this.props.expenses.length; i++){
            if(this.props.expenses[i]){
                totalAmount += (this.props.expenses[i].amount)/1000
            }
        }
      
        
        return "Viewing " + this.props.expenses.length + " expenses totalling $"+ totalAmount
        
    }
   
    render() {
  

        return (
            <div>
                <Header/>
                <p className = "subtitle">{this.renderSubtitle()}</p>
                <Link to = "/dashboard/create">
                   <button onClick = {this.createExpense}>Add Expense</button>
                </Link>
                <ExpenseListFilters />
                <ExpenseList />
            </div>
        )



    }


}

const mapStateToProps = (state) => {

    return {
        auth: state.auth.authenticated,
        email: state.auth.email,
        token: state.auth.token,
        expenses: selectedExpenses(state.expenses, state.filters)
    }
}



export default connect(mapStateToProps)(ExpenseListDashboard);

