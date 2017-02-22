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
    console.log(error.code);
    console.log(error.message);
  });
  //swindow.location.href = "http://localhost:3000/dashboard";
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

var auth_user;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    auth_user = user;
    console.log(user);
    document.getElementById("userId").innerHTML = user.email;
  } else {

  }
});

var ideaBody = document.getElementById('postIdea');

function postIdea() {
  var message = ideaBody.value;
  var firebaseRef = firebase.database().ref();
  firebaseRef.child('ideas').push({
    body: message,
    user_id: auth_user.uid,
    upvotes: 0,
    downvotes: 0
  });
  //console.log()
}

const ideas = firebase.database().ref().child('ideas');
var ulList = document.getElementById('list');
ideas.on('child_added', snap => {
  //console.log(snap.key);
  addIdeasList(snap);

});

/**
 *Used to add a list of the old ideas to the page
 */
function addIdeasList(snap) {
  const li = document.createElement('li')
  li.className += " " + "list-group-item";
  li.innerText = snap.val().body;
  const bt1 = document.createElement('button');
  bt1.className += " " + "btn btn-primary btn-sm glyphicon glyphicon-chevron-down floatRight verticalAlign ml10";
  bt1.innerHTML =snap.val().upvotes;
  bt1.setAttribute("data-ideaid", snap.key);
  bt1.setAttribute("onclick", "upvote()");
  li.appendChild(bt1);

  const bt2 = document.createElement('button');
  bt2.className += " " + "btn btn-primary btn-sm glyphicon glyphicon-chevron-up floatRight verticalAlign";
  bt2.innerHTML = 0;
  li.appendChild(bt2);
  ulList.appendChild(li);
}

function upvote(e) {
  var newupvote
  e = e || window.event;
  var targ = e.target || e.srcElement;
  if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug
  var ideaid = targ.dataset.ideaid;

  //get upvotes value
  var upvotes = firebase.database().ref('ideas/' + ideaid + '/upvotes');
  upvotes.on('value', function (snapshot) {

    //increment it
    newupvote = snapshot.val() + 1;
  });

  //update db with new value
  var updateData = {
    upvotes: newupvote
  };
  var updates = {};
  updates['/ideas/' + ideaid] = updateData;
  firebase.database().ref().update(updates);
  targ.innerHTML = snapshot.val();  
}
