import React from 'react'
import ExpenseListItem from './ExpenseListItem'
import { connect } from 'react-redux'
import selectedExpenses from '../selectors/expenses'

//list of expenses user has
const ExpenseList = (props) => {

    return (
        <div className="content-container">
            <div className="list-header">
                <div className="show-for-mobile">Expenses</div>
                <div className="show-for-desktop">Expense</div>
                <div className="show-for-desktop">Amount</div>
            </div>
            <div className = "list-body">

                {/* each expenses added in the list of an ExpenseListItem component */}
                {
                    props.expenses.length === 0 ? (
                        <div className="list-item list-item-message">

                            <span>No expenses</span>
                        </div>) : (
                        props.expenses.map((expense) => {
                            return <ExpenseListItem key={expense.id} props={expense} />
                        })
                    )
                }
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {

    return {
        //only store selectedExpenses that satisfy the filters
        expenses: selectedExpenses(state.expenses, state.filters)

    }
}



export default connect(mapStateToProps)(ExpenseList);

