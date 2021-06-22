import React from 'react'
import RegisterForm from './register'
import LoginForm from './login'
import GoogleButton from 'react-google-button'
import { connect } from 'react-redux'

const GOOGLE_BUTTON_ID = "google-sign-in-button";

//Landing page of the application, renders the login and register form
class LandingPage extends React.Component {
    constructor(props) {
        super(props)
        //if already authenticated, directly redirect to the dashboard
        if (props.auth) {
            props.history.push("/dashboard")
        }

    


    }

    //method called when sign in is complete
    onSignIn = (googleUser) => {
        console.log("signing in")
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

    //instructions to render google button
    componentDidMount() {
        window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
            'scope': 'https://www.googleapis.com/auth/plus.login',
            'width': 200,
            'height': 50,
            'longtitle': true,
            'theme': 'light',
            'onsuccess': this.onSignIn
        });
    }

    render() {

        return (<div>
            {/* <RegisterForm></RegisterForm>
            <LoginForm></LoginForm> */}

            {/* rendering google button */}
            <div id = {GOOGLE_BUTTON_ID}/>

        </div>)




    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(LandingPage)