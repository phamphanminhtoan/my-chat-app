import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import ChatForm from './components/ChatForm';

firebase.initializeApp({
    apiKey: "AIzaSyCMlllSLF6wfIW_Ldb9YaiCaTlAGw9qU98",
    authDomain: "my-chat-app-d3806.firebaseapp.com",
    databaseURL: "https://my-chat-app-d3806.firebaseio.com",
    projectId: "my-chat-app-d3806",
    storageBucket: "my-chat-app-d3806.appspot.com",
    messagingSenderId: "676901211134"
})

class App extends Component {
    state = { isSignedIn: false }
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
            console.log("user", user)
        })
    }
    render() {
        return (
            <div>
                {this.state.isSignedIn ? (
                    <span>
                        <nav className="navbar navbar-inverse" >
                            <div className="container-fluid">
                                <div className="navbar-header" color='#444753'>
                                    <a className="navbar-brand" href="\">My ChatApp</a>
                                </div>
                                
                                <ul className="nav navbar-nav navbar-right">
                                    <li><a href="/"><span className="glyphicon glyphicon-user"></span> {firebase.auth().currentUser.displayName}</a></li>
                                    <li>
                                        <a href="\">
                                            <span className="glyphicon glyphicon-log-in" onClick={() => firebase.auth().signOut()}>
                                            </span> &nbsp;
                                         Signout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <ChatForm />
                    </span>
                ) : (
                        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                    )}
            </div>

        );
    }
}

export default App;
