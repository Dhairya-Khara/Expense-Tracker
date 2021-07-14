import React from 'react'
import { connect } from 'react-redux'

import { changeAuth } from "../../../actions/auth"
import { addExpense } from '../../dashboard/actions/expenses';


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


        let url = "/loginUser?email=" + encodeURIComponent(profile.getEmail()) + "&name=" + encodeURIComponent(profile.getName())
        let req = new Request(url, {
            method: "POST"
        })

        fetch(req).then(async (response, error) => {
            if (error) {

            }
            const jsonValue = await response.json()

            const token = jsonValue.token

            this.props.dispatch(changeAuth(true, profile.getEmail(), token))

            const url = "/getExpenses?email=" + encodeURIComponent(profile.getEmail())
            let h = new Headers({
                "Authorization": "Bearer " + token
            })

            let req = new Request(url, {
                headers: h,
                method: "GET"
            })

            //API call to fill in the redux store initially
            fetch(req).then((response, error) => {
                response.json().then((data, error) => {

                    //filling the expenses in the reducer one by one
                    for (let i = 0; i < data.length; i++) {

                        this.props.dispatch(addExpense({ description: data[i].description, note: data[i].note, amount: parseInt(data[i].amount), createdAt: parseInt(data[i].createdAt), id: data[i].id }))

                    }

                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                console.log(error)
            })

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
                <div className="landingPageContainer__box">
                    <h1 className="landingPageContainer__title">Expense Tracker</h1>
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