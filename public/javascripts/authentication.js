var config = {
  apiKey: "AIzaSyD9XNmswgLSwsJoCbM89meKN_offp-ERdE",
  authDomain: "ideabox-15cf7.firebaseapp.com",
  databaseURL: "https://ideabox-15cf7.firebaseio.com",
  storageBucket: "ideabox-15cf7.appspot.com",
  messagingSenderId: "883050155915"
};

firebase.initializeApp(config);
var database = firebase.database();
var auth = firebase.auth();


function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
  });

  var q;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      q = user;
      console.log(user);
      document.getElementById("userId").innerHTML = user.email;
    } else {

    }
  });

  window.location.href = "http://localhost:3000/dashboard";
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
    
    window.location.href = "http://localhost:3000";

  }, function (error) {
    console.log(error.code);
    console.log(error.message);
  });
}

var q;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    q = user;
    console.log(user);
    document.getElementById("userId").innerHTML = user.email;
  } else {

  }
});