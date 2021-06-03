import React from 'react'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <h1>Expensify</h1>
            <NavLink to="/dashboard" activeClassName="is-active" exact={true}>Home</NavLink>
            <br></br>
            <NavLink to="/dashboard/create" activeClassName="is-active">Create</NavLink>

            <br></br>

            <NavLink to="/dashboard/help" activeClassName="is-active">Help</NavLink>
        </header>
    )
}

export default Header