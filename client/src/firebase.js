import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPAdU5lza9quT6spIPD4PPe75XIyO9G0w",
  authDomain: "ecommerce-b4607.firebaseapp.com",
  projectId: "ecommerce-b4607",
  storageBucket: "ecommerce-b4607.appspot.com",
  messagingSenderId: "15837302730",
  appId: "1:15837302730:web:9abddb961e11b87b67c933",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// export const googleAuthProvider = new firebase.auth.googleAuthProvider();
