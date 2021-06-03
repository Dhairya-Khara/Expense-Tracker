import React from 'react'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { changeAuth } from '../../../actions/auth'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    }

    logUserIn = () => {
        let url = "http://localhost:8080/loginUser?email=" + encodeURIComponent(this.state.email) + "&password=" + encodeURIComponent(this.state.password)
      
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

    callAPI=() =>{
        fetch("http://localhost:8080/createUser?firstName=" + encodeURIComponent(this.state.firstName) 
        + "&lastName=" + encodeURIComponent(this.state.lastName) + "&email=" + encodeURIComponent(this.state.email) + "&password="+encodeURIComponent(this.state.password),
        {method: "POST"}
        ).then(async (response, error) => {
            if (error) {
                console.log("error")
            }
            // this.setState(()=>{
            //     return{
            //         firstName: "",
            //         lastName: "",
            //         email: "",
            //         password: ""
            //     }
            // })
            this.logUserIn()
        })
    }
    
    onFirstNameChange=(e)=>{
        const firstName = e.target.value;
        this.setState(()=>{
            return{
                firstName
            }
        })
    }
    onLastNameChange=(e)=>{
        const lastName = e.target.value;
        this.setState(()=>{
            return{
                lastName
            }
        })
    }
    onEmailChange=(e)=>{
        const email = e.target.value;
        this.setState(()=>{
            return{
                email
            }
        })
    }
    onPasswordChange = (e)=>{
        const password = e.target.value
        this.setState(()=>{
            return{
                password
            }
        })
    }
    render() {
        return (
            <div>
                <h3>Register</h3>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    
                    this.callAPI()
                }}>
                    <input value = {this.state.firstName} placeholder="First Name" type="text" onChange= {this.onFirstNameChange}></input>
                    <input value = {this.state.lastName} placeholder="Last Name" type="text" onChange = {this.onLastNameChange}></input>
                    <br></br>
                    <input value = {this.state.email} placeholder="Email" type="email" onChange = {this.onEmailChange}></input>
                    <br></br>
                    <input value = {this.state.password} placeholder="Password" type="password" onChange = {this.onPasswordChange}></input>
                    <button>Register</button>
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

export default withRouter(connect(mapStateToProps)(RegisterForm))

