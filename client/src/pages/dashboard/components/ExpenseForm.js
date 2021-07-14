import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import {editExpense, removeExpense} from '../actions/expenses'




class ExpenseForm extends React.Component {

    constructor(props) {
        super(props)
        this.redirectToDashboard = this.redirectToDashboard.bind(this);

        //react state to store info of all the textboxes
        this.state = {
            description: "",
            note: "",
            amount: "",
            createdAt: moment(),
            calendarFocused: false,
            errorState: ""
        }

        //this method is called if user wants to edit the expenses and textboxes need to be filled with the info from the indicidual expense
        if (props.callAPI) {
            this.getInfoOfIndividualExpenseFromAPI()

        }


    }

    //method handling the state change of description
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => {
            return {
                description
            }
        })
    }

    //method handling the state change of note box
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => {
            return {
                note
            }
        })
    }

    //method handling the state change of amount text box
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => {
                return { amount }
            })
        }
    }

    //method handling the state change of date picker
    onDateChange = (createdAt) => {
        this.setState(() => {
            if (createdAt) {
                return {
                    createdAt
                }
            }

        })
    }

    //method handling the state change of calendar widget
    onFocusChange = ({ focused }) => {
        this.setState(() => {
            return {
                calendarFocused: focused
            }
        })
    }

    //method handling the submission of the expense form
    onSubmit = (e) => {
        e.preventDefault();

        //the following code should be executed if user is creating a new expense
        if (!this.props.callAPI) {
            if (!this.state.description || !this.state.amount) {
                this.setState(() => {
                    return {
                        errorState: "Please provide a description and amount"
                    }
                })
            }
            else {
                this.setState(() => {
                    return {
                        errorState: ""
                    }
                })
                this.props.onSubmit({
                    description: this.state.description,
                    amount: parseFloat(this.state.amount, 10) * 1000,
                    createdAt: this.state.createdAt.valueOf(),
                    note: this.state.note
                })

            }
        }

        //the following code should be executed if user is editting existing expense
        else if (this.props.callAPI) {
            this.onEditExpense()
            this.redirectToDashboard(this.props)
        }

    }

    //redirect to dashboard after form submission
    redirectToDashboard = (props) => {
        ///time out is set because database needs to be updated BEFORE going to dashboard. Else, outdated dashboard is rendered even if database is updated
        setTimeout(() => {
            props.history.push("/dashboard")
        }, 50)
    }

    //call this method when editting expense
    getInfoOfIndividualExpenseFromAPI = () => {

        //expense id stores the id of the individual expense that needs to be editted
        const expenseID = this.props.expenseID
        const email = this.props.email

        let url = "https://khara-expense-tracker-server.herokuapp.com/singleExpense?email=" + encodeURIComponent(email) + "&id=" + encodeURIComponent(expenseID)

        let h = new Headers({
            "Authorization": this.props.token
        })
        let req = new Request(url, {
            method: "GET",
            headers: h
        })
        fetch(req).then(async (response, error) => {
            if (error) {
                console.log(error)
                return
            }
            const parseResponse = await response.json()

            //after getting information from database, store it in react state
            this.setState(() => {
                return {
                    description: parseResponse.description,
                    amount: parseResponse.amount / 1000,
                    createdAt: moment(parseResponse.createdAt),
                    note: parseResponse.note

                }
            })
        })

    }

    //method called on submission of the edit expense form from onSubmit()
    //api call to edit expense in database
    onEditExpense = () => {

        const expenseID = this.props.expenseID
        const email = this.props.email
  
        const updatedDescription = this.state.description
        const updatedAmount = this.state.amount*1000
        const updatedNote = this.state.note
        const updatedCreatedAt = this.state.createdAt

        const updates = {
            description: updatedDescription,
            amount: updatedAmount,
            note: updatedNote,
            createdAt: updatedCreatedAt
        }
        
        //editting redux store Expense Reducer
        this.props.dispatch(editExpense(expenseID, updates))        

        let url = "/updateExpense?email=" + encodeURIComponent(email) + "&id=" + encodeURIComponent(expenseID) + "&description=" +
            encodeURIComponent(this.state.description) + "&amount=" + encodeURIComponent(this.state.amount) + "&createdAt=" + encodeURIComponent(moment(this.state.createdAt).unix() * 1000) + "&note="
            + encodeURIComponent(this.state.note)

        let h = new Headers({
            "Authorization": this.props.token
        })
        let req = new Request(url, {
            method: "PATCH",
            headers: h
        })

        //editting expense in the database
        fetch(req).then(async (response, error) => {
            if (error) {
                console.log("error")
                return
            }
            return
        })
    }

    //method called when remove expense button is clicked
    //api call to remove the individual expense from the database
    removeExpense = () => {

        const expenseID = this.props.expenseID
        const email = this.props.email

        //deleting expense from the redux store Expense Reducer
        this.props.dispatch(removeExpense(expenseID))

        let url = "/deleteExpense?email=" + encodeURIComponent(email) + "&id=" + encodeURIComponent(expenseID)


        let h = new Headers({
            "Authorization": this.props.token
        })
        let req = new Request(url, {
            method: "POST",
            headers: h
        })

        //deleting expense from the database
        fetch(req).then(async (response, error) => {
            if (error) {
                console.log("error")

            }

        })

        //redirect to dashboard after expense is deleted
        this.redirectToDashboard(this.props)
    }

    render() {

        return (
            <div>
                {/* The main form of this page. Information will already be filled if editting expense */}
                <form className="form" onSubmit={this.onSubmit}>
                    {this.state.errorState ? <p className="form__error">{this.state.errorState}</p> : <p></p>}
                    <input className="text-input" value={this.state.description} placeholder="Description" type="text" autoFocus onChange={this.onDescriptionChange}></input>
                    <input className="text-input" value={this.state.amount} placeholder="Amount" type="text" onChange={this.onAmountChange}></input>
                    <br></br>
                    <SingleDatePicker

                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => {
                            return false;
                        }}
                    />
                    <br></br>
                    <textarea className="text-area" value={this.state.note} placeholder="Add a note for your expense (optional)" onChange={this.onNoteChange}></textarea>

                    <div>
                        <button className = "button">{this.props.callAPI ? "Edit Expense" : "Add Expense"}</button>
                    </div>





                </form>
                {/* Only render the RemoveExpense button if the form is rendered while for editting purposes */}
                {this.props.callAPI ? <button className = "button button--secondary" onClick={this.removeExpense}>Remove Expense</button> : false}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default withRouter(connect(mapStateToProps)(ExpenseForm))