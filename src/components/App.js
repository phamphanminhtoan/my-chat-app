import React, { Component } from 'react';
import firebase from 'firebase';
import MemberList from './MemberList';
import { connect } from 'react-redux';
import { startCreateRoom } from '../actions/rooms';
import {onAddUser} from '../actions/auth'

class App extends Component {
    
    
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
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            joinError: ''
        }
    }
    

    onCreateRoom = () => {
       
        const user = this.props.auth;
       
        const value = this.props.auth.displayName;
        if(user) {
           
            if(value) {
                this.props.startCreateRoom();
            } 
            else {
            //this.setState({error: 'Please enter a valid room name!'});
            }
        }
    }

    showCreateError = (error) => {
        this.setState({
            error 
        });
    }

    showJoinError = (joinError) => {
        this.setState({
            joinError 
        });
    }

    
    componentDidMount = () => {
        
    }

    onAddUser = () => {
       
        this.props.onAddUser();
    }

    render() {
        
        return (
            <div>
                {this.onAddUser()}
                {this.onCreateRoom()}
                
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
                    <MemberList />
                </span>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    rooms: state.rooms,
     users: state.users
});

const mapDispatchToProps = (dispatch, props) => {
    return {
        startCreateRoom: () => dispatch(startCreateRoom()),
        onAddUser: () => dispatch(onAddUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
