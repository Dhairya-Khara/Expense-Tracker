import React from 'react'
import RegisterForm from './register'
import LoginForm from './login'
import { connect } from 'react-redux'

class LandingPage extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        if (!this.props.auth) {
            return (
                <div>
                    <RegisterForm></RegisterForm>
                    <LoginForm></LoginForm>
                </div>
            )
        }
        else if (this.props.auth) {
            this.props.history.push("/dashboard")
            return (<div></div>)

        }


    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(LandingPage)