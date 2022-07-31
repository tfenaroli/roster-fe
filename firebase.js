// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDT8mVAxmNOaetuxSDTjWAbbw2UtdTxyN4",
	authDomain: "mobile-auth-25021.firebaseapp.com",
	projectId: "mobile-auth-25021",
	storageBucket: "mobile-auth-25021.appspot.com",
	messagingSenderId: "409637068235",
	appId: "1:409637068235:web:b4eb8d1d1dc4641bde6a4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };