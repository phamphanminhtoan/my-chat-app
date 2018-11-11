import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccess: () => false
    }
}

export class LoginPage extends React.Component {
    startLogin = () => {
        console.log("Login Page")
        this.props.startLogin();
    }

    render() {
        return (
           
            <StyledFirebaseAuth startLogin={this.startLogin} uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        )
    }
};

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
