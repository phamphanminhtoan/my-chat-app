import React from 'react';
import { connect } from 'react-redux';
import selectMessages from '../selectors/messages';
import moment from 'moment';

class Messages extends React.Component {
    displayMessages = (list) => {
        
        let a = [], prevSender;
        if(list !== null && list !== undefined){
            
            Object.keys(list).map((key) => {
            
            const messEL = list[key].sender.uid === this.props.auth.uid ? <li key={key} className="clearfix">
                <div className="message-data">
                    <span className="message-data-name"><i className="fa fa-circle online" /> {list[key].sender.displayName}</span>
                    <span className="message-data-time">{moment(list[key].createdAt).format('h:mm:ss a, MMMM Do YYYY, dddd')}</span>
                </div>
                <div className="message my-message">
                    {list[key].text}
                </div>
            </li>
                : <li key={key} className="clearfix">
                    <div className="message-data align-right">
                        <span className="message-data-time">{list[key].createdAt}</span> &nbsp; &nbsp;
        <span className="message-data-name">{list[key].sender.displayName}</span> <i className="fa fa-circle me" />
                    </div>
                    <div className="message other-message float-right">
                        {list[key].text}
                    </div>
                </li>;
            if (list[key].status) {
                a.push(messEL);
                prevSender = null;
            }

            else if (prevSender === list[key].sender.uid) {
                a.push(messEL);
            }
            else {
                prevSender = list[key].sender.uid;
                a.push(messEL);
            }
        });}
        return a;
    }
    render() {
        var { rooms, person, messages } = this.props;
        
        if (rooms.length !== 0 && person !== null && messages !== undefined) {
            var list = messages.messages;
            
            return (
                <div className="chat-history">
                    <ul>
                        {
                            this.displayMessages(list)

                        }

                    </ul>
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

export default connect(mapStateToProps)(Messages);