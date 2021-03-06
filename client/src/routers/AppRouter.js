import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import LandingPage from '../pages/Landing Page/components/landingPage'
import ExpenseDashboard from '../pages/dashboard/components/ExpenseDashboardPage'
import AddExpensePage from '../pages/dashboard/components/AddExpensePage'
import HelpPage from '../pages/dashboard/components/HelpPage'
import NotFoundPage from '../pages/dashboard/components/NotFoundPage'
import EditPage from '../pages/dashboard/components/EditPage'

//Main router for the application
class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    
                    <Switch>
                        <Route path="/" component={LandingPage} exact={true} />
                        <Route path = "/dashboard" component = {ExpenseDashboard} exact = {true}/>
                        <Route path = "/dashboard/create" component = {AddExpensePage}/>
                        <Route path = "/dashboard/help" component = {HelpPage}/>
                        <Route path="/dashboard/edit/:id" component={EditPage} />
                        <Route component = {NotFoundPage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default AppRouter