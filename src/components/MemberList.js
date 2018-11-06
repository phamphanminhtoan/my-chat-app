import React, { Component } from 'react';
import ChatForm from './ChatForm';
import { connect } from 'react-redux';
import { startClearUnread } from '../actions/rooms';
import * as actRoom from './../actions/rooms';
import * as actAuth from './../actions/auth';

let CONTACTS = [
    {
        id: 1,
        name: 'Vincent Porter',
        status: 'online',
        image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg'
    },
    {
        id: 2,
        name: 'Aiden Chavez',
        status: 'left 7 mins ago',
        image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg'
    },
    {
        id: 3,
        name: 'Mike Thomas',
        status: 'online',
        image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg'
    },
    {
        id: 4,
        name: 'Erica Hughes',
        status: 'online',
        image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg'
    },
    {
        id: 5,
        name: 'Ginger Johnston',
        status: 'online',
        image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg'
    },
    {
        id: 6,
        name: 'Tracy Carpenter',
        status: 'left 30 mins ago',
        image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_06.jpg'
    },
    {
        id: 7,
        name: 'Christian Kelly',
        status: 'left 10 hours ago',
        image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_07.jpg'
    },
    {
        id: 8,
        name: 'Monica Ward',
        status: 'online',
        image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_08.jpg'
    },
    {
        id: 9,
        name: 'Dean Henry',
        status: 'offline since Oct 28',
        image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg'
    },
    {
        id: 10,
        name: 'Peyton Mckinney',
        status: 'online',
        image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_10.jpg'
    }
];


class Member extends Component {
    render() {
        return (
            <li className="clearfix">
                <img src={this.props.image} alt="avatar" />
                <div className="about">
                    <div className="name">{this.props.name}</div>
                    <div className="status">
                        <i className={this.props.status === 'online' ? "fa fa-circle online" : "fa fa-circle offline"} /> {this.props.status}
                    </div>
                </div>
            </li>
        )
    }
}

class MemberList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedContacts: CONTACTS
        };
    }

    searchHandler = (event) => {
        let searcjQery = event.target.value.toLowerCase(),
            displayedContacts = CONTACTS.filter((el) => {
                let searchValue = el.name.toLowerCase();
                return searchValue.indexOf(searcjQery) !== -1;
            })
        this.setState({
            displayedContacts: displayedContacts
        })
    }

    onJoinChat = (e) => {
        e.preventDefault();
        const user = this.props.auth;
        const data = {
            roomName: e.target.rname.value,
            id: user.uid,
            name: user.displayName,
            unread: 0
        }
        this.props.onLoadChat(data);
    }

    render() {
        let contacts = this.state.displayedContacts;
        var { auth, rooms, onLoadChat } = this.props;
        console.log(rooms);
        return (
            <div className="myContainer clearfix">
                <div className="people-list" id="people-list">
                    <div className="search">
                        <input type="text" placeholder="search" onChange={this.searchHandler} />
                        <i className="fa fa-search" />
                    </div>
                    
                    <ul className="list">
                        {
                            contacts.map((el) => {
                                return <Member key={el.id}
                                    name={el.name}
                                    image={el.image}
                                    status={el.status}
                                />
                            })
                        }
                    </ul>
                </div>
                <ChatForm onJoinChat={this.onJoinChat} auth={auth} onLoadChat={onLoadChat} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    rooms: state.rooms,
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    startClearUnread: (roomName) => dispatch(startClearUnread(roomName)),
    onLoadChat: (data) => dispatch(actRoom.actOnLoadChat(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MemberList);
