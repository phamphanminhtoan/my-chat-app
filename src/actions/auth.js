import firebase, { database, githubAuthProvider as provider } from '../firebase/fbConfig';

export const login = (uid, image, displayName) => ({
    type: 'LOGIN',
    uid,
    image,
    displayName
});


export const onAddUser = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) =>
    {
        
        return database.ref('users').once('value', (snapshot) => {
            
            const members = [];
            snapshot.forEach((childSnapshot) => {
                members.push({
                    ...childSnapshot.val()
                });
            });
           
            const user = {
                uid: getState().auth.uid,
                image: getState().auth.image,
                displayName: getState().auth.displayName
            }
            
            if (!members.find((m) => m.uid === getState().auth.uid) || members === null) {
                return database.ref(`users/${getState().auth.uid}`).set(user).then(() => {
                    
                })
                
            }
            
        })
    }
}
export const startLogin = () => {

    return ({ getFirebase, getFirestore }) => {
        // return firebase.auth().signInWithPopup(googleAuthProvider);
        firebase.auth().signInWithRedirect(provider);
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return ({ getFirebase, getFirestore }) => {
        return firebase.auth().signOut();
    };
};
