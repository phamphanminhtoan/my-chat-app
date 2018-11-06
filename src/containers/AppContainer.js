import React, { Component } from 'react';
import App from './../components/App'
import * as actRoom from './../actions/rooms';
import * as actAuth from './../actions/auth';
import { connect } from 'react-redux';
class AppContainer extends Component {
    
    render() {
        var { auth, onCreateChat, onLogin } = this.props;

        return (
            <App auth={auth} onCreateChat={onCreateChat} onLogin={onLogin}  />
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLogin: (user) => dispatch(actAuth.actOnLogin(user)),
        onCreateChat: (room, showCreateError) => dispatch(actRoom.actOnCreateChat(room, showCreateError)),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);