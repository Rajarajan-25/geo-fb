// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClr5J5c9vXCYES2CiG8pYkubZqucAhOA0",
  authDomain: "geo-fb-bc358.firebaseapp.com",
  projectId: "geo-fb-bc358",
  storageBucket: "geo-fb-bc358.appspot.com",
  messagingSenderId: "261049098491",
  appId: "1:261049098491:web:f8c8d7258b7aa611cd905e",
  measurementId: "G-9TEJKRFMN9"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);