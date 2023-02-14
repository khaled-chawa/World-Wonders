// Import the functions you need from the SDKs you need
import { initializeApp } from "../../node_modules/firebase/app";
import { GoogleAuthProvider, getAuth, signInWithRedirect, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKsMlqlC-lEvcnzKREFJIvDqr2DIkqN_U",
  authDomain: "schoolnea-110b0.firebaseapp.com",
  projectId: "schoolnea-110b0",
  storageBucket: "schoolnea-110b0.appspot.com",
  messagingSenderId: "591757366860",
  appId: "1:591757366860:web:497ce4dbad0137f6e986e9",
  measurementId: "G-DHJB9Z4WVB"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Sign in with google
const provider = new GoogleAuthProvider();

// Use the authentication service
const auth = getAuth()
auth.useDeviceLanguage()

// Listen for sign in/out
// If signed in, get profile pic and display sign out button
let signedIn = false
const signout = document.getElementById('signOut')

auth.onAuthStateChanged(user => {
  if (user) {
    signedIn = true
    localStorage.setItem('profilePic', JSON.stringify(user.photoURL))
    signout.style.display = 'initial'
  } else {
    signedIn = false
    signout.style.display = 'none'
  }
})

// Check if user signed in or not through play button
// If signed in, redirect to game page when play is clicked
// If not signed in, redirect to sign in page
const play = document.getElementById('play')

play.addEventListener('click', async () => {
  if (signedIn) {
    document.location='../gamePage/index.html'
  } else {
    signInWithRedirect(auth, provider)
  }
})

// Listen for clicks on signout button, once clicked sign the user out
signout.addEventListener('click', async () => {
  signOut(auth)
})