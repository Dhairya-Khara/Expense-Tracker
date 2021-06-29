import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import Header from './Header'

class EditPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            description: "",
            amount: 0,
            createdAt: 0,
            note: "",
        }

        if (props.auth === false) {
            props.history.push("/")
        }

    }


    //call to API to edit the specific expense
    callAPI() {

        //id of expense to edit
        const expenseID = this.props.match.url.substring(19, this.props.match.url.length);

        let url = "http://localhost:8080/singleExpense?email=" + encodeURIComponent(this.props.email) + "&id=" + encodeURIComponent(expenseID)

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

            //setting the state with info acquried from the api call
            this.setState(() => {
                return ({
                    description: parseResponse.description,
                    amount: parseResponse.amount,
                    createdAt: parseResponse.createdAt,
                    note: parseResponse.note
                })
            })

        })
    }

    render() {

        return (
            <div>
                <Header />
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                {/* Expense form with info from the api call is rendered */}
                <div className="content-container">
                    <ExpenseForm callAPI={true} expenseID={this.props.match.url.substring(19, this.props.match.url.length)} email={this.props.email} />
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
        expenseId: state.expenses.id
    }
}

export default connect(mapStateToProps)(EditPage)