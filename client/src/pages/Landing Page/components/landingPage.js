import React from 'react'
import RegisterForm from './register'
import LoginForm from './login'
import { connect } from 'react-redux'

//Landing page of the application, renders the login and register form
class LandingPage extends React.Component {
    constructor(props) {
        super(props)
        //if already authenticated, directly redirect to the dashboard
        if(props.auth){
            props.history.push("/dashboard")
        }

    }



    render() {

        return (<div>
            <RegisterForm></RegisterForm>
            <LoginForm></LoginForm>
        </div>)




    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(LandingPage)