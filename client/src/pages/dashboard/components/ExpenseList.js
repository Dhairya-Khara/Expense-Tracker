import React from 'react'
import ExpenseListItem from './ExpenseListItem'
import {connect} from 'react-redux'
import selectedExpenses from '../selectors/expenses'

//list of expenses user has
const ExpenseList = (props)=>{
    
    return(
        <div>
           
           {/* each expenses added in the list of an ExpenseListItem component */}
            {props.expenses.map((expense)=>{
                
                return <ExpenseListItem key = {expense.id}  props = {expense}/>
                
            })}
        </div>
    )
}
const mapStateToProps = (state)=>{

    return {
        //only store selectedExpenses that satisfy the filters
        expenses: selectedExpenses(state.expenses, state.filters)
        
    }
}



export default  connect(mapStateToProps)(ExpenseList);

