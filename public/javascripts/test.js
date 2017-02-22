var config = {
  apiKey: "AIzaSyD9XNmswgLSwsJoCbM89meKN_offp-ERdE",
  authDomain: "ideabox-15cf7.firebaseapp.com",
  databaseURL: "https://ideabox-15cf7.firebaseio.com",
  storageBucket: "ideabox-15cf7.appspot.com",
  messagingSenderId: "883050155915"
};
firebase.initializeApp(config);
var database = firebase.database();
const auth = firebase.auth();

function login() {
  const txtEmail = document.getElementById('email');
  const txtPassword = document.getElementById('password');
  const email = txtEmail.value;
  const password = txtPassword.value;

  //Sign in
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
}

function signup() {
  const newEmail = document.getElementById('regEmail');
  const newPassword = document.getElementById('regPassword');
  const newUsername = document.getElementById('regUsername');
  const email = newEmail.value;
  const password = newPassword.value;

  //Sign up
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    console.log(error.code);
    console.log(error.message);
  });

}

function signout() {
  firebase.auth().signOut().then(function () {
    console.log("Logged out!")
  }, function (error) {
    console.log(error.code);
    console.log(error.message);
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
    document.getElementById("userId").innerHTML = user.email;
  } else {

  }
});