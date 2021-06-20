import React from 'react'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { changeAuth } from '../../../actions/auth'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        //react state that stores information requried for registration
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            error:""
        }
    }

    //if registeration is successful, directly log user in
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
            //if email is already registered
            if(jsonValue === false){
                this.setState(()=>{
                    return{
                        error: "Email is already registered. Please Log in.",
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: ""
                    }
                })
            }

            //successful registeration
            else{

                //standard log in procedure
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
            }
           
        })
    }

    //api called to register user and store in database
    callAPI=() =>{
        fetch("http://localhost:8080/createUser?firstName=" + encodeURIComponent(this.state.firstName) 
        + "&lastName=" + encodeURIComponent(this.state.lastName) + "&email=" + encodeURIComponent(this.state.email) + "&password="+encodeURIComponent(this.state.password),
        {method: "POST"}
        ).then(async (response, error) => {
            if (error) {
                console.log("error")
            }
           //call logUserIn to try and log in after registeration
            this.logUserIn()
        })
    }
    
    //method handling change in firstName state
    onFirstNameChange=(e)=>{
        const firstName = e.target.value;
        this.setState(()=>{
            return{
                firstName
            }
        })
    }

    //method handling change in lastName state
    onLastNameChange=(e)=>{
        const lastName = e.target.value;
        this.setState(()=>{
            return{
                lastName
            }
        })
    }

    //method handling change in email state
    onEmailChange=(e)=>{
        const email = e.target.value;
        this.setState(()=>{
            return{
                email
            }
        })
    }

    //method handling change in password state
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
                    {/* error is rendered only if duplicate email is provided */}
                    <p>{this.state.error}</p>
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

