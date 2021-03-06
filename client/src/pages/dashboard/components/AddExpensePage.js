import React from 'react'
import ExpenseForm from './ExpenseForm'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import Header from './Header'
import { addExpense } from '../actions/expenses'


class AddExpensePage extends React.Component {

    constructor(props) {
        super(props)
        //if not authenticated, redirect to landing page
        if (props.auth === false) {
            props.history.push("/")
        }
    }

    //method that calls the api to add expense to database
    callAPI = ({ description, createdAt, amount, note }) => {
        const id = uuidv4()
        this.props.dispatch(addExpense({description, createdAt, amount, note, id}))
        let url = "/createExpense?description="
            + encodeURIComponent(description) + "&createdAt=" + encodeURIComponent(createdAt) + "&amount="
            + encodeURIComponent(amount) + "&note=" + encodeURIComponent(note) + "&email=" + encodeURIComponent(this.props.email) + "&id="
            + encodeURIComponent(id)

        //jwt token is sent using the header, is verified on the back end
        let h = new Headers({
            "Authorization": this.props.token
        })

        let req = new Request(url, {
            method: "POST",
            headers: h
        })
        fetch(req).then(async (response, error) => {

        })
    }

    render() {

        return (

            <div>
                <Header />
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm onSubmit={(expense) => {


                        this.callAPI(expense)
                        //time out is set because database needs to be updated BEFORE going to dashboard. Else, outdated dashboard is rendered even if database is updated
                        setTimeout(() => {
                            this.props.history.push('/dashboard')
                        }, 10)

                    }} />
                </div>
            </div>
        )


    }
}

const mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        token: state.auth.token,
        auth: state.auth.authenticated,
    }
}

export default connect(mapStateToProps)(AddExpensePage)