import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import makeRootReducer from './../reducers/index';
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import { config as fbConfig, reduxFirebase as rrfConfig } from '../config'
import { version } from '../../package.json'

export default (initialState = {}) => {
    window.version = version
    const middleware = [
        thunk.withExtraArgument(getFirebase)
    ]
    const enhancers = []

    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())

    }
    firebase.initializeApp(fbConfig);

    const store = createStore(
        makeRootReducer(),
        initialState,
        compose(
            applyMiddleware(...middleware),
            reactReduxFirebase(firebase, rrfConfig),
            ...enhancers
        )
    )
    store.asyncReducers = {}


    if (module.hot) {
        module.hot.accept('./../reducers/index', () => {
            const reducers = require('./../reducers/index').default
            store.replaceReducer(reducers(store.asyncReducers))
        })
    }

    return store
}

