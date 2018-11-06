import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import MemberList from './MemberList';


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            isSignedIn: false,
            error: '',
            joinError: ''
        }
    }
    
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
    onCreateChat = () => {
       
        const user = this.props.auth.auth;
        const value = this.props.auth.roomname;
        if (user) {
            const name = user.displayName;
           
            if (value) {
                
                const room = {
                    name: value,
                    people: {
                        id: user.uid,
                        name,
                        unread: 0,
                        lastRead: 0,
                        image: user.photoURL
                    }
                }
                
                this.props.onCreateChat(room, this.showCreateError);
               
            } else {
                this.setState({ error: 'Please enter a valid room name!' });
            }
        }
    }
    showCreateError = (error) => {
        this.setState({
            error
        });
    }
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
            this.props.onLogin(user)
            console.log("user", user)
        })
    }

    render() {
        var {auth, onLoadChat} = this.props;
        return (
            <div>
                {this.state.isSignedIn ? (
                    <span>
                        {this.onCreateChat()}
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
                        <MemberList/>
                    </span>
                ) : (
                        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                    )}
            </div>

        );
    }
}

export default App;
