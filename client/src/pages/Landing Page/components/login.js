import React from 'react'
import { connect } from 'react-redux'
import { changeAuth } from '../../../actions/auth'
import { withRouter } from 'react-router-dom'

//Component that renders the Login Form
class LoginForm extends React.Component {

    constructor(props) {
        super(props)

        //react state storing values for the form
        this.state = {
            email: "",
            password: "",
            error: ""
        }
    }


    //call api to login
    callAPI = () => {
        let url = "http://localhost:8080/loginUser?email=" + encodeURIComponent(this.state.email) + "&password=" + encodeURIComponent(this.state.password)

        let req = new Request(url, {
            method: "POST",
        })

        fetch(req).then(async (response, error) => {
            if (error) {
                console.log("error")
                console.log(error)
            }

            const jsonValue = await response.json()
            
            //wrong email or password provided
            if (jsonValue === false) {
                this.setState(() => {
                    return {
                        error: "Wrong Email or Password"
                    }
                })
            }

            //correct email and password provided
            else {
                const isAuthenticated = jsonValue.auth

                const emailInUse = this.state.email
                const token = jsonValue.token

                //reset state
                this.setState(() => {
                    return {
                        email: "",
                        password: ""
                    }
                })
                //set authenticated true and log user in
                if (isAuthenticated) {

                    this.props.dispatch(changeAuth(true, emailInUse, token))

                    this.props.history.push('/dashboard')

                }
                else {
                    this.props.dispatch(changeAuth(false))
                }
            }

        })
    }

    //method handling change in the email state
    onEmailChange = (e) => {
        const email = e.target.value
        this.setState(() => {
            return { email }
        })
    }

    //method  handling change in the password state
    onPasswordChange = (e) => {
        const password = e.target.value
        this.setState(() => {
            return { password }
        })
    }

    render() {
        return (
            <div>
                <h3>Log In</h3>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    //call api that tries to log user in
                    this.callAPI()
                }}>
                    <input value={this.state.email} placeholder="email" type="text" onChange={this.onEmailChange}></input>
                    <input value={this.state.password} placeholder="password" type="password" onChange={this.onPasswordChange}></input>
                    <button>Log In</button>
                    {/* error message displayed only if wrong email or password is provided */}
                    <p>{this.state.error}</p>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default withRouter(connect(mapStateToProps)(LoginForm))



