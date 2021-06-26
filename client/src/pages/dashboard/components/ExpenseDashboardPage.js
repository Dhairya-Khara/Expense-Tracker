import React from 'react'
import { connect } from 'react-redux'

import ExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters'
import { addExpense, resetExpenseReducer } from '../actions/expenses'


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


    




    render() {


        return (
            <div>
                <Header></Header>
                <h3>Expense List for {this.props.email}</h3>

               

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
        token: state.auth.token
    }
}



export default connect(mapStateToProps)(ExpenseListDashboard);

