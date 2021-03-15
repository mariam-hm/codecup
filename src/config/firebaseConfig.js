import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/functions'

const firebaseConfig = {
    apiKey: "AIzaSyDNGS8HKeOoQdbPTT1e4Mt59uvLA63_uFs",
    authDomain: "qna-app-c90b5.firebaseapp.com",
    projectId: "qna-app-c90b5",
    storageBucket: "qna-app-c90b5.appspot.com",
    messagingSenderId: "1009875712529",
    appId: "1:1009875712529:web:ce26cbeb90a6c2cf054fb0"
};

// ------------ INITIALISATION --------------

firebase.initializeApp(firebaseConfig);

// ------------ EXPORTS --------------

export const firestore = firebase.firestore()
export const auth = firebase.auth();
export const storage = firebase.storage();
export const functions = firebase.functions();