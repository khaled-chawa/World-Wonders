// Import functions
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithRedirect, signOut } from "firebase/auth";
import { setDoc, collection, getFirestore, doc, addDoc, GeoPoint } from 'firebase/firestore'

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
const app = initializeApp(firebaseConfig);

// Sign in with google
const provider = new GoogleAuthProvider(app);

// Use the authentication service
const auth = getAuth(app)
auth.useDeviceLanguage()

// Listen for sign in/out
// If signed in, set variable 'signedIn' to true, get profile pic, and display sign out and history buttons
// Else, set variable 'signedIn' to false and hide signout and history buttons
let signedIn
const signout = document.getElementById('signOut')
const history = document.getElementById('history')

auth.onAuthStateChanged(user => {
  if (user) {
    signedIn = true
    localStorage.setItem('profilePic', JSON.stringify(user.photoURL))
    localStorage.setItem('uid', user.uid)
    signout.style.display = 'initial'
    history.style.display = 'initial'
    console.log(user)
  } else {
    signedIn = false
    signout.style.display = 'none'
    history.style.display = 'none'
  }
})

// Check if user signed in or not through play button
// If signed in, redirect to game page when play is clicked
// If not signed in, redirect to sign in page
const play = document.getElementById('play')

play.addEventListener('click', async () => {
  console.log(signedIn)
  if (signedIn) {
    document.location='../gamePage/index.html'
  } else {
    signInWithRedirect(auth, provider)
  }
})

// Listen for clicks on signout button, once clicked sign the user out and add 'is-active' to class name
const popup = document.querySelector('.popup')

signout.addEventListener('click', async () => {
  signOut(auth)
  popup.classList.add('is-active')
})

// Exporting app for use when setting up databse later
export { app }