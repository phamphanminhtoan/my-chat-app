import database, { firebase, githubAuthProvider as provider } from '../firebase/firebase';

export const onLogin = (users) => {
   
    return {
        type: 'ONLOAD',
        users
    }
}

export const setUser = () => {
    
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        if (uid) {
            return database.ref('users').once('value', (snapshot) => {
                const users = [];
               
                snapshot.forEach((childSnapshot) => {
                    if(uid !== childSnapshot.val().uid){
                    users.push({
                        ...childSnapshot.val()
                    });}
                });
                console.log(users)
                dispatch(onLogin(users))
            });
        }
    }

}

export const setStart = () => {
    return (dispatch, getState) => {

    };
}
