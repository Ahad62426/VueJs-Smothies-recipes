import firebase from 'firebase/app';
// eslint-disable-next-line no-unused-vars
import firestore from 'firebase/firestore';

// config Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA1yswsEzlx843qRTBeC95CiuSzwwaonQI",
    authDomain: "ninja-smoothies-79de8.firebaseapp.com",
    databaseURL: "https://ninja-smoothies-79de8.firebaseio.com",
    projectId: "ninja-smoothies-79de8",
    storageBucket: "ninja-smoothies-79de8.appspot.com",
    messagingSenderId: "1035979373326",
    appId: "1:1035979373326:web:42b3653a07d6dedb"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// export firestore database
export default firebaseApp.firestore();