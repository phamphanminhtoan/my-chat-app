import database from '../firebase/firebase';
import moment from 'moment';

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

export const startSendMessage = (text, person, status = false) => {
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
            

            database.ref("rooms").once('value', (snapshot) => {
                const roomKey = [];
                var temp = snapshot.val();
                for (var key in temp) {
                    roomKey.push({
                        key
                    });
                    
                }
                
                var c = roomKey.find((r) => r.key === `${getState().auth.uid}-${person.uid}`) !== undefined 
                ? roomKey.find((r) => r.key === `${getState().auth.uid}-${person.uid}`).key 
                : roomKey.find((r) => r.key === `${person.uid}-${getState().auth.uid}`).key ;
                database.ref(`rooms/${c}/messages`).push(message);
                
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
                                dispatch(createRoom({ ...roomper }));
                                dispatch(startListening(roomName1));
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