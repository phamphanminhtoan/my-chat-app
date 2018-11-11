import React, { Component } from 'react';
import { startSendMessage, startLeaveRoom, startClearUnread } from '../actions/rooms';
import { connect } from 'react-redux';

class ChatForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ""
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
        var { rooms, person, auth } = this.props;
      
        if (rooms.length !== 0 && person !== null) {
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
                                <li className="clearfix">
                                    <div className="message-data align-right">
                                        <span className="message-data-time">10:10 AM, Today</span> &nbsp; &nbsp;
                                            <span className="message-data-name">Olia</span> <i className="fa fa-circle me" />
                                    </div>
                                    <div className="message other-message float-right">
                                        Hi Vincent, how are you? How is the project coming along?
                                        </div>
                                </li>
                                <li>
                                    <div className="message-data">
                                        <span className="message-data-name"><i className="fa fa-circle online" /> Vincent</span>
                                        <span className="message-data-time">10:12 AM, Today</span>
                                    </div>
                                    <div className="message my-message">
                                        Are we meeting today? Project has been already finished and I have results to show you.
                                        </div>
                                </li>
                                <li className="clearfix">
                                    <div className="message-data align-right">
                                        <span className="message-data-time">10:14 AM, Today</span> &nbsp; &nbsp;
                              <span className="message-data-name">Olia</span> <i className="fa fa-circle me" />
                                    </div>
                                    <div className="message other-message float-right">
                                        Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                            </div>
                                </li>
                                <li>
                                    <div className="message-data">
                                        <span className="message-data-name"><i className="fa fa-circle online" /> Vincent</span>
                                        <span className="message-data-time">10:20 AM, Today</span>
                                    </div>
                                    <div className="message my-message">
                                        Actually everything was fine. I'm very excited to show this to our team.
                            </div>
                                </li>
                                <li>
                                    <div className="message-data">
                                        <span className="message-data-name"><i className="fa fa-circle online" /> Vincent</span>
                                        <span className="message-data-time">10:31 AM, Today</span>
                                    </div>
                                    <i className="fa fa-circle online" />
                                    <i className="fa fa-circle online" style={{ color: '#AED2A6' }} />
                                    <i className="fa fa-circle online" style={{ color: '#DAE9DA' }} />
                                </li>
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

const mapStateToProps = (state) => ({
    auth: state.auth,
    rooms: state.rooms
});

const mapDispatchToProps = (dispatch) => ({
    startSendMessage: (message, roomName) => dispatch(startSendMessage(message, roomName)),
    startLeaveRoom: (roomName) => dispatch(startLeaveRoom(roomName)),
    startClearUnread: (roomName) => dispatch(startClearUnread(roomName))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);

