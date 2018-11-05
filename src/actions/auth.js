import firebase from 'firebase';

export const login = (uid, displayName) => ({
    type: 'LOGIN',
    uid,
    displayName
});


export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};
