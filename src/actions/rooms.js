import database, { firebase } from '../firebase/firebase';
import { history } from '../routers/AppRouter';
import moment from 'moment';
import * as path from 'path';
import { getDiffieHellman } from 'crypto';
// import { ipcRenderer } from 'electron';

export const createRoom = ({ id, messages }) => ({
    type: 'CREATE_ROOM',
    room: {
        id,
        messages
    }
});
export const getId = (key) => {
    return key
}
export const setStartState = () => {
    return (dispatch, getState) => {

        const uid = getState().auth.uid;

        if (uid) {

            return database.ref('rooms').once('value', (snapshot) => {
                if (snapshot.val()) {

                    const rooms = snapshot.val();

                    for (const key in rooms) {
                        dispatch(startListening(key));
                        database.ref(`rooms/${key}`).once('value', (snapshot) => {
                            const room = snapshot.val();
                            const { messages} = room;
                            const id = key;
                            dispatch(createRoom({id, messages}))
                        });
                    }
                    dispatch(orderRoomsStartState());
                }
            });
        }
    };
}

export const startSendMessage = (text, room, status = false) => {
    return (dispatch, getState) => {
        const user = getState().auth;
        if (user) {

            const { displayName, uid } = user;
            const message = {
                sender: { displayName, uid },
                text,
                createdAt: moment().format(),
                status
            };

            database.ref(`rooms/${user.displayName}/messages`).once('value', (snapshot) => {
                const messages = [];
                var temp = snapshot.val();
                for (var key in temp) {
                    messages.push({
                        ...temp[key], id: key
                    });
                }


                if (!messages.find((m) => m.id === room.id) || messages === null) {

                    return database.ref(`rooms/${user.displayName}/messages/${room.id}`).set(room.id).then((ref) => {
                        return database.ref(`rooms/${user.displayName}/messages/${room.id}`).push(message);
                    });
                }
                else {

                    return database.ref(`rooms/${user.displayName}/messages/${room.id}`).push(message);
                }
            });
        }
    };
};

export const test = (roomName) => {
    return database.ref('rooms').once('value', (snapshot) => {
        const rooms = [];

        snapshot.forEach((childSnapshot) => {

            rooms.push({
                ...childSnapshot.val()
            });
        });
        if (rooms !== null && rooms.find((r) => r.name === roomName)) return false;

        return true;
    });

}
export const setRoom = (roomName, auth) => {

    return database.ref('rooms').once('value', (snapshot) => {
        
        const messages = {
            sender: { displayName: auth.displayName, uid: auth.uid },
            text: `You can contact together!`,
            createdAt: moment().format(),
            status: true
        }
        
        database.ref(`rooms/${roomName}`).set(roomName).then(() => {
            database.ref(`rooms/${roomName}/messages`).push(messages);
        });
    });
}

export const startCreateRoom = () => {
    return (dispatch, getState) => {

        return database.ref('users').once('value', (snapshot) => {
            const users = [];
            const objUsers = snapshot.val();

            snapshot.forEach((childSnapshot) => {
                users.push({
                    ...childSnapshot.val()
                });
            });
            if (!users.find((u) => u.uid === getState().auth.uid)) {
                if (users.length > 0) {

                    for (var userKey in objUsers) {

                        if (userKey !== getState().auth.uid) {
                            var roomName1 = `${getState().auth.uid}-${userKey}`;

                            var roomName2 = `${userKey}-${getState().auth.uid}`;
                            const roomper = {
                                id: roomName1,
                                name: roomName1,
                                image: getState().auth.image,
                            }
                            if (test(roomName1) && test(roomName2)) {

                                setRoom(roomName1, getState().auth);
                                dispatch(createRoom({ ...roomper }))
                            }
                        }

                    }
                }
            }

        })

    };
};


export const startListening = (roomName) => {

    return (dispatch, getState) => {
        return database.ref(`rooms/${roomName}/messages`).on('child_added', (msgSnapshot) => {
            if (getState().rooms.find((r) => r.name === roomName)) {
                database.ref(`rooms/${roomName}/people`).once('value', (personSnapshot) => {
                    const message = msgSnapshot.val();

                    dispatch(sendMessage({ ...message, id: msgSnapshot.key }, roomName));
                    dispatch(orderRoomsStartState());
                    // if (message.sender.displayName !== getState().auth.displayName) {
                    //     // ipcRenderer.send('playNotif', message.sender.displayName, message.text);
                    //     const audio = new Audio('./../public/sounds/notif.mp3');
                    //     audio.play();
                    // }
                    const keyword = message.status && message.text.split(' ').splice(-1, 1)[0];
                    if (keyword === "left") {
                        dispatch(onLeft(roomName, message.sender.uid));
                    }
                    else if (keyword === "joined") {
                        dispatch(onJoined(roomName, personSnapshot.val()[message.sender.uid]));
                    }
                    const personID = getState().auth.uid;

                    if (personID === message.sender.uid && keyword !== 'left') {
                        database.ref(`rooms/${roomName}/people/${personID}`).update({ unread: 0, lastRead: message.createdAt }).then(() => {
                            dispatch(setUnread(roomName, personID, message.createdAt, 0));
                        });
                    }
                    else if (personID !== message.sender.uid && moment(message.createdAt) > moment(personSnapshot.val()[personID].lastRead)) {
                        database.ref(`rooms/${roomName}/people/${personID}`).update({ unread: personSnapshot.val()[personID].unread + 1, lastRead: message.createdAt }).then(() => {
                            dispatch(setUnread(roomName, personID, message.createdAt, personSnapshot.val()[personID].unread + 1));
                        });
                    }
                });
            }
        });
    }
}

const isAlreadyAdded = (data, id) => {
    for (var key in data) {
        if (data[key].id === id) return true;
    }
    return false;
}


export const startJoinRoom = (data = {}, showJoinError) => {
    return (dispatch, getState) => {
        const state = getState();
        return database.ref('rooms').once('value', (snapshot) => {
            const value = snapshot.val();
            const id = data.uid;
            if (value === null) {
                return showJoinError('Room not found!');
            }
            for (let roomsKey in value) {
                if (roomsKey !== data.displayName) {

                    database.ref(`rooms/${roomsKey}`).once('value', (snapshot) => {
                        const room = snapshot.val();
                        if (room.people && room.people[id]) {
                            //history.push(`room/${data.roomName}`);

                        }
                        else {
                            dispatch(startListening(roomsKey));
                            const person = {
                                name: data.name,
                                id: data.uid,
                                image: data.image,
                                unread: data.unread,
                                lastRead: 0
                            };
                            let people = [];
                            let messages = [];
                            for (var key in room.people) {
                                people.push({
                                    id: room.people[key].id,
                                    name: room.people[key].name,
                                    image: room.people[key].image,
                                    unread: room.people[key].unread,
                                    lastRead: room.people[key].lastRead
                                });
                            }
                            for (var messageKey in room.messages) {
                                messages.push({
                                    ...room.messages[messageKey]
                                });
                            }
                            return database.ref(`rooms/${roomsKey}/people/${person.id}`).set(person).then((ref) => {
                                database.ref(`users/${person.id}/rooms/${roomsKey}`).set({ roomName: roomsKey });

                                dispatch(createRoom({
                                    people: [...people, person],
                                    name: roomsKey,
                                    image: data.image,
                                    messages
                                }));
                                const perName = person.name;

                                dispatch(startSendMessage(`${perName} joined`, roomsKey, true));

                                //history.push(`room/${data.roomName}`);
                            });
                        }
                    });
                }
            }
        });
    }
}

export const sendMessage = (message, roomName) => ({
    type: 'SEND_MESSAGE',
    message,
    roomName
});



export const orderRoomsStartState = () => ({
    type: 'ORDER_ROOMS_START_STATE'
});



export const clearState = ({
    type: 'CLEAR_STATE'
})

export const leaveRoom = (roomName, userId) => ({
    type: 'LEAVE_ROOM',
    roomName,
    userId
});

export const startLeaveRoom = (roomName) => {
    return (dispatch, getState) => {
        const user = getState().auth;
        if (user) {
            const userId = user.uid;
            const displayName = user.displayName;
            database.ref(`rooms/${roomName}/people/${userId}`).remove();
            database.ref(`users/${userId}/rooms/${roomName}`).remove(() => {
                dispatch(leaveRoom(roomName, userId));
                //dispatch(startSendMessage(`${displayName} left`, roomName, true));
                history.push('/join');
            });
        }
    };
};

export const clearUnread = (roomName, uid, time, unread) => ({
    type: 'CLEAR_UNREAD',
    roomName,
    uid,
    time,
    unread
});

export const setUnread = (roomName, uid, time, unread) => {
    return (dispatch) => {
        dispatch(clearUnread(roomName, uid, time, unread));
    }
};

export const startClearUnread = (roomName) => {
    return (dispatch, getState) => {
        let time = moment().endOf('month');
        const uid = getState().auth.uid;
        if (uid) {
            time = moment().format();
            return database.ref(`rooms/${roomName}/people/${uid}`).update({
                unread: 0,
                lastRead: time
            }).then(() => {
                dispatch(clearUnread(roomName, uid, time, 0));
            });
        }
    };
};

export const onLeft = (roomName, personID) => ({
    type: 'ON_LEFT',
    roomName,
    personID
});

export const onJoined = (roomName, person) => ({
    type: 'ON_JOINED',
    roomName,
    person
});