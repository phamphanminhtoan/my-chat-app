import React, { Component } from 'react';
import App from './../components/App'
import * as actRoom from './../actions/rooms';
import * as actAuth from './../actions/auth';
import { connect } from 'react-redux';
class AppContainer extends Component {
    
    render() {
        var { auth, onCreateChat, onLogin, rooms } = this.props;

        return (
            <App auth={auth} room={rooms} onCreateChat={onCreateChat} onLogin={onLogin}  />
        );
    }
}



export default (AppContainer);