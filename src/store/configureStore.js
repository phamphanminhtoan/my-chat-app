import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import roomsReducer from '../reducers/rooms';
import usersReducer from '../reducers/users';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import { getFirebase, reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import fbConfig from './../firebase/fbConfig';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            rooms: roomsReducer,
            users: usersReducer,
            firebase: firebaseReducer
        }),
        compose(
            composeEnhancers(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))),
            reduxFirestore(fbConfig),
            reactReduxFirebase(fbConfig)
        )
    );

    return store;
};
