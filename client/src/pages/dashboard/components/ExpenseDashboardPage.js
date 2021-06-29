import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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

    renderSubtitle = () => {
        if (this.props.expenses[0] && (this.props.expenses).length <= 0) {

            return (
                <div>
                    Viewing <span>0</span> expenses totalling <span>$0.00</span>
                </div>
            )
        }
        else if ((this.props.expenses).length === 1) {

            return (
                <div>
                    Viewing <span>1</span> expense totalling <span>${this.props.expenses[0].amount / 1000}</span>
                </div>
            )
        }
        let totalAmount = 0
        for (let i = 0; i <= this.props.expenses.length; i++) {
            if (this.props.expenses[i]) {
                totalAmount += (this.props.expenses[i].amount) / 1000
            }
        }


        return (
            <div>
                Viewing <span>{this.props.expenses.length}</span> expenses totalling <span>${totalAmount}</span>
            </div>
        )


    }

    render() {


        return (
            <div>
                <Header />

                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">{this.renderSubtitle()}</h1>

                        <div className="page-header__actions">
                            <Link to="/dashboard/create">
                                <button className="button" onClick={this.createExpense}>Add Expense</button>
                            </Link>
                        </div>
                    </div>

                </div>

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

