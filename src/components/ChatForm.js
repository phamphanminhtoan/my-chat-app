import React, { Component } from 'react';
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


class Contact extends Component {
    render() {
        return (
            <li className="clearfix">
                <img src={this.props.image} alt="avatar" />
                <div className="about">
                    <div className="name">{this.props.name}</div>
                    <div className="status">
                        <i className = {this.props.status === 'online' ? "fa fa-circle online" : "fa fa-circle offline"} /> {this.props.status}
                    </div>
                </div>
            </li>
        )
    }
}

class ChatForm extends Component {
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

    render() {
        let contacts = this.state.displayedContacts;
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
                                return <Contact key={el.id}
                                    name={el.name}
                                    image={el.image}
                                    status={el.status}
                                />
                            })
                        }
                    </ul>
                </div>
                <div className="chat">
                    <div className="chat-header clearfix">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
                        <div className="chat-about">
                            <div className="chat-with">Chat with Vincent Porter</div>
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
                    <div className="chat-message clearfix">
                        <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows={3} defaultValue={""} />
                        <i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
                    <i className="fa fa-file-image-o" />
                        <button>Send</button>
                    </div> {/* end chat-message */}
                </div> {/* end chat */}
            </div>
        );
    }
}



export default ChatForm;
