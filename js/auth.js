  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
 import {  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut

  
 
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
 
      // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyCfJIqeL58MMsjAYE5sA1LrWv7mUdfx6Pc",
        authDomain: "projectfirebase-259ac.firebaseapp.com",
        databaseURL: "https://projectfirebase-259ac-default-rtdb.firebaseio.com",
        projectId: "projectfirebase-259ac",
        storageBucket: "projectfirebase-259ac.appspot.com",
        messagingSenderId: "1064927987332",
        appId: "1:1064927987332:web:3a868e1bce3d8310fea4d1",
        measurementId: "G-EX7NE53703"
    };

// init firebase
initializeApp(firebaseConfig)

// init services

const auth = getAuth()

// signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user created:', cred.user)
      signupForm.reset()
    })
    alert('user created!');
  })
    .catch(err => {
      console.log(err.message)
    })


// logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('user signed out')
    })
     alert('User has signed out');
    })
    .catch(err => {
      console.log(err.message)
    })


const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user logged in:', cred.user)
      loginForm.reset()
    })
         alert('User has signed out');
    })
    .catch(err => {
      console.log(err.message)
    })


