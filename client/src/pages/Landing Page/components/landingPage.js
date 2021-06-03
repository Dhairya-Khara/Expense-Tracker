import React from 'react'
import RegisterForm from './register'
import LoginForm from './login'

export default class LandingPage extends React.Component {

    render(){
        return(
            <div>
                <RegisterForm></RegisterForm>
                <LoginForm></LoginForm>
            </div>
        )
    }
}