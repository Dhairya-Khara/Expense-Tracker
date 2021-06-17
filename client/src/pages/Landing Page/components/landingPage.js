import React from 'react'
import RegisterForm from './register'
import LoginForm from './login'
import { connect } from 'react-redux'

class LandingPage extends React.Component {
    constructor(props) {
        super(props)
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