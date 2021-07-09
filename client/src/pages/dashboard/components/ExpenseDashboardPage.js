import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters'
import selectedExpenses from '../selectors/expenses'
import Header from './Header'



class ExpenseListDashboard extends React.Component {
    constructor(props) {
        super(props)

        //if user is not authenticated, redirected to landing page
        if (props.auth === false) {
            props.history.push("/")
        }

    }




    //method that returns the value for the the line 'Viewing {# of Expenses} expenses tottaling {totalExpenses}'
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

