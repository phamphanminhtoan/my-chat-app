import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import MemberList from './MemberList';


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
        var {auth, onLoadChat} = this.props;
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
                                        <a href="/" onClick={() => firebase.auth().signOut()}>
                                            <span className="glyphicon glyphicon-log-in" >
                                            </span> &nbsp;
                                         Signout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <MemberList auth={auth} onLoadChat = {onLoadChat} />
                    </span>
                ) : (
                        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                    )}
            </div>

        );
    }
}

export default App;
