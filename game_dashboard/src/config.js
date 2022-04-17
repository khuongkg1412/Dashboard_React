import firebase from 'firebase/compat/app';
import "firebase/compat/storage"
const firebaseConfig = {
    apiKey: "AIzaSyBxUxr6ogmLfeTK73zFSK19hSaGA1yjH4M",
    authDomain: "ltd2k-fptk14.firebaseapp.com",
    databaseURL: "https://ltd2k-fptk14-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ltd2k-fptk14",
    storageBucket: "ltd2k-fptk14.appspot.com",
    messagingSenderId: "390092557592",
    appId: "1:390092557592:web:f0fe87b8b465cc56ab626d",
    measurementId: "G-H8FRBF9KQF"
};
export const app = firebase.initializeApp(firebaseConfig);
