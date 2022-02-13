import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyCPnQqT4C2pVk9tKmSfY6H3wBnrsEnA2y4",
  
    authDomain: "appeliotes.firebaseapp.com",
  
    projectId: "appeliotes",
  
    storageBucket: "appeliotes.appspot.com",
    messagingSenderId: "609374989286",
    appId: "1:609374989286:web:41f91a4aa7058d5cd5c427",
    measurementId: "G-WM29H9YXBB"
  };
  

firebase.initializeApp(firebaseConfig);

export { firebase };