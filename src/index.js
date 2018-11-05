import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppRouter from './routers/AppRouter';
import {Provider} from 'react-redux';
import firebase from 'firebase';
import configureStore from './store/configureStore';
import * as config from './constants/firebase-infor'

const store = configureStore();

firebase.initializeApp(config.FIREBASE_INFOR);


ReactDOM.render(
    <Provider store={store} >
        <AppRouter />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();