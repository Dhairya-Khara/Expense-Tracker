import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css';
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom';




class ExpenseForm extends React.Component {

    constructor(props) {
        super(props)
        this.redirectToDashboard = this.redirectToDashboard.bind(this);
        this.state = {
            description: "",
            note: "",
            amount: "",
            createdAt: moment(),
            calendarFocused: false,
            errorState: ""
        }

        if (props.callAPI) {
            this.getInfoOfIndividualExpenseFromAPI()

        }


    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => {
            return {
                description
            }
        })
    }
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => {
            return {
                note
            }
        })
    }
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => {
                return { amount }
            })
        }
    }
    onDateChange = (createdAt) => {
        this.setState(() => {
            if (createdAt) {
                return {
                    createdAt
                }
            }

        })
    }
    onFocusChange = ({ focused }) => {
        this.setState(() => {
            return {
                calendarFocused: focused
            }
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
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
        else if (this.props.callAPI) {
            this.editExpense()
            this.redirectToDashboard(this.props)
        }

    }

    redirectToDashboard = (props)=>{
        setTimeout(() => {
            props.history.push("/dashboard")
        }, 10)
    }

    getInfoOfIndividualExpenseFromAPI = () => {
        


        const expenseID = this.props.expenseID
        const email = this.props.email
        let url = "http://localhost:8080/singleExpense?email=" + encodeURIComponent(email) + "&id=" + encodeURIComponent(expenseID)

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
            
            this.setState(() => {
                return {
                    description: parseResponse.description,
                    amount: parseResponse.amount/1000,
                    createdAt: moment(parseResponse.createdAt),
                    note: parseResponse.note

                }
            })
        })

    }

    editExpense = () => {

        const expenseID = this.props.expenseID
        const email = this.props.email

        let url = "http://localhost:8080/updateExpense?email=" + encodeURIComponent(email) + "&id=" + encodeURIComponent(expenseID) + "&description=" +
            encodeURIComponent(this.state.description) + "&amount=" + encodeURIComponent(this.state.amount) + "&createdAt=" + encodeURIComponent(moment(this.state.createdAt).unix() * 1000) + "&note="
            + encodeURIComponent(this.state.note)

        let h = new Headers({
            "Authorization": this.props.token
        })
        let req = new Request(url, {
            method: "PATCH",
            headers: h
        })

        fetch(req).then(async (response, error) => {
            if (error) {
                console.log("error")
                return
            }
            return
        })
    }

    removeExpense=()=>{
        
        const expenseID = this.props.expenseID
        const email = this.props.email
        
        let url = "http://localhost:8080/deleteExpense?email=" + encodeURIComponent(email) + "&id=" + encodeURIComponent(expenseID)
          

        let h = new Headers({
            "Authorization": this.props.token
        })
        let req = new Request(url, {
            method: "POST",
            headers: h
        })

        fetch(req).then(async (response, error) => {
            if (error) {
                console.log("error")
                
            }
         
        })
        this.redirectToDashboard(this.props)
    }

    render() {
        
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input value={this.state.description} placeholder="Description" type="text" autoFocus onChange={this.onDescriptionChange}></input>
                    <input value={this.state.amount} placeholder="Amount" type="number" onChange={this.onAmountChange}></input>
                    <br></br>
                    <SingleDatePicker
                       
                        date = {this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => {
                            return false;
                        }}
                    />
                    <br></br>
                    <textarea value={this.state.note} placeholder="Add a note for your expense (optional)" onChange={this.onNoteChange}></textarea>
                    <button>{this.props.callAPI ? "Edit Expense" : "Add Expense"}</button>

                    {this.state.errorState ? <p>{this.state.errorState}</p> : <p></p>}


                </form>
                {this.props.callAPI ? <button onClick = {this.removeExpense}>Remove Expense</button> : false}
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