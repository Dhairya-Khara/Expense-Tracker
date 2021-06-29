import React from 'react'
import RegisterForm from './register'
import LoginForm from './login'
import GoogleButton from 'react-google-button'
import { connect } from 'react-redux'

import { changeAuth } from "../../../actions/auth"


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

        var profile = googleUser.getBasicProfile();


        let url = "http://localhost:8080/loginUser?email=" + encodeURIComponent(profile.getEmail()) + "&name=" + encodeURIComponent(profile.getName())
        let req = new Request(url, {
            method: "POST"
        })

        fetch(req).then(async (response, error) => {
            if (error) {
                console.log("error line 39 landingPage.js")
            }
            const jsonValue = await response.json()
            const isAuthenticated = jsonValue.auth
            const token = jsonValue.token

            this.props.dispatch(changeAuth(true, profile.getEmail(), token))
            this.props.history.push("/dashboard")
        })
    }

    //instructions to render google button
    componentDidMount() {

        window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
            'scope': 'https://www.googleapis.com/auth/plus.login',
            'width': 200,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': this.onSignIn
        });
    }

    render() {

        return (

            <div className="landingPageContainer">
                <div className = "landingPageContainer__box">
                    <h1 className = "landingPageContainer__title">Expense Tracker</h1>
                    <p>By Dhairya Khara</p>
                    {/* rendering google button */}
                    <div id={GOOGLE_BUTTON_ID} />
                </div>

            </div>)




    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(LandingPage)