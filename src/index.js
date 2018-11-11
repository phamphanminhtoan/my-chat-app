import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import { setStartState, clearState } from './actions/rooms';
import { history } from './routers/AppRouter';
import LoadingPage from './components/LoadingPage';
import {setUser} from './actions/users'


const store = configureStore();
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
let hasRendered = false;

const renderApp = () => {
    if (!hasRendered) {
        // store.dispatch(setStartState());
        ReactDOM.render(jsx, document.getElementById('root'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        
        const name = user.displayName ? user.displayName : user.email;
        store.dispatch(login(user.uid, user.photoURL, name));
        
        store.dispatch(setUser());
        renderApp();
        store.dispatch(setStartState());
        
       
        if (history.location.pathname === '/') {
            history.push('/join');
        }
    } else {
        store.dispatch(logout());
        store.dispatch(clearState);
        renderApp();
        //history.push('/');
    }
});

serviceWorker.unregister();

