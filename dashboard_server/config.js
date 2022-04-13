import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);