import React from 'react'
import {  Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { changeAuth } from '../../../actions/auth'
import { resetFilterReducer } from '../actions/filters'
import { resetExpenseReducer } from '../actions/expenses'



class Header extends React.Component {
    

    //method called when logout button is clicked
    logout = (e) => {


        const url = "/logout?email=" + encodeURIComponent(this.props.email) + "&token=" + encodeURIComponent(this.props.token)
        let h = new Headers({
            "Authorization":  "Bearer " +this.props.token
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
                <header className="header">
                    <div className="content-container" >
                        <div className="header__content">
                            <Link to="/dashboard" className="header__title">
                                <h1>Expense Tracker</h1>
                            </Link>
                            <Link to="/">
                                <button className="logoutButton" onClick={this.logout}>Logout</button>

                            </Link>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth.authenticated,
        email: state.auth.email,
        token: state.auth.token
    }
}


export default connect(mapStateToProps)(Header);