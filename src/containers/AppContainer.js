import React, { Component } from 'react';
import App from './../components/App'
import * as act from './../actions/rooms';
import { connect } from 'react-redux';
class AppContainer extends Component {
    state = {
        error: '',
        joinError: ''
    };
    
    onCreateRoom = (e) => {
        e.preventDefault();
        const user = this.props.auth;
        const value = e.target.rname.value.trim();
        if (user) {
            const name = user.displayName;
            if (value) {
                this.setState({ error: '' });
                const room = {
                    name: value,
                    people: {
                        id: user.uid,
                        name,
                        unread: 0,
                        lastRead: 0
                    }
                }
                this.props.onCreateChat(room, this.showCreateError);
            } else {
                this.setState({ error: 'Please enter a valid room name!' });
            }
        }
    }
    render() {
        var { auth, onCreateChat } = this.props;

        return (
            <App auth={auth} onCreateChat={this.onCreateRoom} />
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch, props) => {
    return {
        onCreateChat: (room, showCreateError) => dispatch(act.actOnCreateChat(room, showCreateError)),
        onLoadChat: (data) => dispatch(act.actOnLoadChat(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);