import React, { Component } from 'react';
import { startSendMessage, startClearUnread } from '../actions/rooms';
import selectMessages from '../selectors/messages';
import { connect } from 'react-redux';

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
        var { rooms, person, messages, auth } = this.props;

        if (rooms.length !== 0 && person !== null && messages !== undefined) {
            var list = messages.messages

            

            
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
                        <div className="chat-history">
                            <ul>
                                {
                                    Object.keys(list).map((key) => {
                                        if (list[key].sender.uid === auth.uid) {
                                            return (
                                                <li key = {key} className="clearfix">
                                                    <div className="message-data">
                                                        <span className="message-data-name"><i className="fa fa-circle online" /> {list[key].sender.displayName}</span>
                                                        <span className="message-data-time">{list[key].createdAt}</span>
                                                    </div>
                                                    <div className="message my-message">
                                                        {list[key].text}
                                                    </div>
                                                </li>
                                            );
                                        }
                                        else {
                                            return (
                                                <li key = {key} className="clearfix">
                                                    <div className="message-data align-right">
                                                        <span className="message-data-time">{list[key].createdAt}</span> &nbsp; &nbsp;
                                                        <span className="message-data-name">{list[key].sender.displayName}</span> <i className="fa fa-circle me" />
                                                    </div>
                                                    <div className="message other-message float-right">
                                                        {list[key].text}
                                                    </div>
                                                </li>

                                            );
                                        }
                                    })
                                }
                                
                            </ul>
                        </div> {/* end chat-history */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);

