import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCMlllSLF6wfIW_Ldb9YaiCaTlAGw9qU98",
    authDomain: "my-chat-app-d3806.firebaseapp.com",
    databaseURL: "https://my-chat-app-d3806.firebaseio.com",
    projectId: "my-chat-app-d3806",
    storageBucket: "my-chat-app-d3806.appspot.com",
    messagingSenderId: "676901211134"
};

firebase.initializeApp(config);

const database = firebase.database();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();

firebase.firestore().settings({ timestampsInSnapshots: true });

export { database, githubAuthProvider, firebase  as default };
