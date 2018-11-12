import React, { Component } from 'react';
import { startSendMessage, startClearUnread } from '../actions/rooms';
import selectMessages from '../selectors/messages';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, getFirebase, reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { database } from './../firebase/fbConfig';
import moment from 'moment';
import Messages from './Messages';

class ChatForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }
    

    onSubmit = (e) => {
        e.preventDefault();
        const message = e.target.message.value;

        if (!message.trim()) {
            e.target.submit.diabled = true;
            return;
        }

        this.props.startSendMessage(message, this.props.person);
        e.target.reset();
    }

    

    render() {
        var { rooms, person, messages } = this.props;
        
        if (rooms.length !== 0 && person !== null && messages !== undefined) {
            var list = messages.messages;
            return (
                <div className="myContainer clearfix">
                    <div className="chat">
                        <div className="chat-header clearfix">
                            <img src="" alt="avatar" />
                            <div className="chat-about">
                                <div className="chat-with">Chat with {person.displayName} </div>
                                <div className="chat-num-messages">already 1 902 messages</div>
                            </div>
                            <i className="fa fa-star" />
                        </div> {/* end chat-header */}
                        <Messages person = {person}/> {/* end chat-history */}
                        <form onSubmit={this.onSubmit} autoComplete="off" id="message-form">
                            <div className="chat-message clearfix">
                                <textarea name="message" id="message-to-send" placeholder="Type your message" rows={3} defaultValue={""} />
                                <i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
                                    <i className="fa fa-file-image-o" />
                                <button name="submit">Send</button>
                            </div> {/* end chat-message */}

                        </form>
                    </div> {/* end chat */}
                </div>
            );
        }
        else {
            return (<div><h1>Loading chat...</h1></div>)
        }
    }
}

const mapStateToProps = (state, props) => ({
    auth: state.auth,
    rooms: state.rooms,
    messages: selectMessages(state.rooms, props.person, state.auth.uid)
});

const mapDispatchToProps = (dispatch) => ({
    startSendMessage: (message, roomName) => dispatch(startSendMessage(message, roomName)),
    startClearUnread: (roomName) => dispatch(startClearUnread(roomName))
});

export default compose(firebaseConnect(), connect(mapStateToProps, mapDispatchToProps))(ChatForm);

