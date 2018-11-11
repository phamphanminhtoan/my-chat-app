import React, { Component } from 'react';
import ChatForm from './ChatForm';
import { connect } from 'react-redux';
import { startClearUnread, setStartState } from '../actions/rooms';
import * as actRoom from './../actions/rooms';
import * as actAuth from './../actions/auth';
import firebase from 'firebase'

class MemberList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedContacts: this.props.users,
            index: -1,
            objUser: null,
        };
    }

    searchHandler = (event) => {
        let searcjQery = event.target.value.toLowerCase(),
            displayedContacts = this.props.users.filter((el) => {

                let searchValue = el.displayName.toLowerCase();

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

    }


    jumpTo(user) {
       console.log("member",user.image)
        this.setState({
            index: user.uid,
            objUser: user,
            
        });
    }

    setStartState = () => {
        this.props.setStartState();
    }

    render() {

        var { rooms, users } = this.props;
        if (users.length > 0) {
            return (

                <div className="myContainer clearfix" onLoad={() => { this.setState({ displayedContacts: this.props.users, index: users[0].uid, objUser: users[0]}); }}>

                    <div className="people-list" id="people-list">
                        <div className="search">
                            <input type="text" placeholder="search" onChange={this.searchHandler} />
                            <i className="fa fa-search" />
                        </div>

                        <ul className="list">
                            {

                                this.state.displayedContacts.length > 0 ? this.state.displayedContacts.map((el) => {

                                    return (
                                        <li
                                            key={el.uid}
                                            onClick={() => { this.jumpTo(el); }}
                                            className={this.state.index === el.uid ? "clearfix abc active" : "clearfix abc"}
                                        >
                                            <img src={el.image} alt="avatar" />
                                            <div className="about">
                                                <div className="name">{el.displayName}</div>
                                                <div className="status">
                                                    <i className={el.unread === 'online' ? "fa fa-circle online" : "fa fa-circle offline"} /> {el.unread}
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })
                                    :
                               users.map((el) => {

                                    return (
                                        <li
                                            key={el.uid}
                                            onClick={() => { this.jumpTo(el); }}
                                            className={this.state.index === el.uid || this.state.index === users[0].uid ? "clearfix abc active" : "clearfix abc"}
                                        >
                                            <img src={el.image} alt="avatar" />
                                            <div className="about">
                                                <div className="name">{el.displayName}</div>
                                                <div className="status">
                                                    <i className={el.unread === 'online' ? "fa fa-circle online" : "fa fa-circle offline"} /> {el.unread}
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    <ChatForm person={this.state.objUser} />
                </div>
            );
        }
        else {
            return (
                <div><h1>Loading...</h1></div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    rooms: state.rooms,
    auth: state.auth, 
    users: state.users
});

const mapDispatchToProps = (dispatch) => ({
    setStartState: (roomName) => dispatch(setStartState()),
    startClearUnread: (roomName) => dispatch(startClearUnread(roomName)),
    
});

export default connect(mapStateToProps, mapDispatchToProps)(MemberList);
