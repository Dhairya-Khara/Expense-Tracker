import React from 'react'
import ExpenseListItem from './ExpenseListItem'
import {connect} from 'react-redux'
import selectedExpenses from '../selectors/expenses'

const ExpenseList = (props)=>{
    
    return(
        <div>
           
            {props.expenses.map((expense)=>{
                
                return <ExpenseListItem key = {expense.id}  props = {expense}/>
                
            })}
        </div>
    )
}
const mapStateToProps = (state)=>{

    return {
        expenses: selectedExpenses(state.expenses, state.filters)
        
    }
}



export default  connect(mapStateToProps)(ExpenseList);

