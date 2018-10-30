import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

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
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        OK right?
          </p>
                    {this.state.isSignedIn ? (
                        <span>
                            <div>Signed In!</div>
                            <button onClick={() => firebase.auth().signOut()}>Sign Out!</button>
                            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                        </span>
                    ) : (
                            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                        )}
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
          </a>
                </header>
            </div>
        );
    }
}

export default App;
