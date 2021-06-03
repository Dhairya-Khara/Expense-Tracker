import React from 'react'
import { connect } from 'react-redux'
import { changeAuth } from '../../../actions/auth'
import {withRouter} from 'react-router-dom'

class LoginForm extends React.Component {
   
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    

    callAPI = () => {
        let url = "http://localhost:8080/loginUser?email=" + encodeURIComponent(this.state.email) + "&password=" + encodeURIComponent(this.state.password)
        // let h = new Headers({
        //     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFkNDYyNGQ2MTAyNDQ1MjRiODg3N2EiLCJpYXQiOjE2MjE5Njg0MjB9.jsSg1xSWYW15-fcIuWJZpMTd313u1_XGf82nWwO9lmU"
        // })

        let req = new Request(url, {
            method: "POST",
        })

        fetch(req).then(async (response, error) => {
            if (error) {
                console.log(error)
            }

            const jsonValue = await response.json()
            const isAuthenticated = jsonValue.auth

            const emailInUse = this.state.email
            const token = jsonValue.token
            
            this.setState(() => {
                return {
                    email: "",
                    password: ""
                }
            })
            if (isAuthenticated) {
           
                this.props.dispatch(changeAuth(true, emailInUse, token ))
                
                this.props.history.push('/dashboard')
            
            }
            else {
                this.props.dispatch(changeAuth(true))
            }
        })
    }

    onEmailChange = (e) => {
        const email = e.target.value
        this.setState(() => {
            return { email }
        })
    }

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
                    this.callAPI()
                }}>
                    <input value={this.state.email} placeholder="email" type="text" onChange={this.onEmailChange}></input>
                    <input value={this.state.password} placeholder="password" type="password" onChange={this.onPasswordChange}></input>
                    <button>Log In</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        token: state.auth.token
    }
}
 
export default withRouter(connect(mapStateToProps)(LoginForm))


