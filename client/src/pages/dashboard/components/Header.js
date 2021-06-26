import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import { changeAuth } from '../../../actions/auth'
import { resetFilterReducer } from '../actions/filters'
import { resetExpenseReducer } from '../actions/expenses'

//Header component that is rendered on every page after user logs in
// const Header = () => {
//     return (
//         <header>
//             <h1>Expense Tracker</h1>

//         </header>
//     )
// }

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    //method called when logout button is clicked
    logout = (e) => {


        const url = "http://localhost:8080/logout?email=" + encodeURIComponent(this.props.email) + "&token=" + encodeURIComponent(this.props.token)
        let h = new Headers({
            "Authorization": "Bearer " + this.props.token
        })

        let req = new Request(url, {
            method: "POST",
            headers: h
        })

        fetch(req).then(() => {

        }).catch((error) => {
            console.log(error)

        })

        //changing auth to false, and resetting expense and filter reducers
        this.props.dispatch(changeAuth(false, undefined, undefined))
        this.props.dispatch(resetExpenseReducer())
        this.props.dispatch(resetFilterReducer())



    }

    render() {
        return (
            <div>
                <header>
                    <h1>Expense Tracker</h1>
                    <Link to="/">
                        <button onClick={this.logout}>Logout</button>

                    </Link>

                </header>
            </div>
        )
    }
}

export default Header