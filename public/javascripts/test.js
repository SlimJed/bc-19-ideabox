var config = {
  apiKey: "AIzaSyD9XNmswgLSwsJoCbM89meKN_offp-ERdE",
  authDomain: "ideabox-15cf7.firebaseapp.com",
  databaseURL: "https://ideabox-15cf7.firebaseio.com",
  storageBucket: "ideabox-15cf7.appspot.com",
  messagingSenderId: "883050155915"
};
firebase.initializeApp(config);
var auth = firebase.auth();

/**
 *The login function
 */
function login() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  //SignIn authentication with firebase
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error, user) {
    console.log(error.code);
    console.log(error.message);

  });
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      window.location.href = "http://localhost:3000/dashboard";
    }
  });
}

/**
 *The SignUp function
 */
function signup() {
  var newEmail = document.getElementById('regEmail');
  var newPassword = document.getElementById('regPassword');
  var newUsername = document.getElementById('regUsername');
  var email = newEmail.value;
  var password = newPassword.value;

  //SignUp authentication with firebase
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    console.log(error.code);
    console.log(error.message);
  });
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      window.location.href = "http://localhost:3000/dashboard";
    }
  });
}

/**
 *The SignOut function
*/
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
    document.getElementById("userId").innerHTML = user.email;
  }
});
var ideaBody = document.getElementById('postIdea');

/**
 *The PostIdea function
 *This enables a user to post ideas to the database
 */
function postIdea() {
  var message = ideaBody.value;
  var firebaseRef = firebase.database().ref();
  firebaseRef.child('ideas').push({
    body: message.trim(),
    user_id: auth_user.uid,
    upvotes: 0,
    downvotes: 0
  });
}

var ideas = firebase.database().ref().child('ideas');
//This monitors a change in the idea list, in the database.
ideas.on('child_added', snap => {
  addIdeasList(snap);
});

/**
 *Used to add a list of the old ideas to the page
 * @param snap  - An object containig the duplicate of the database 
*/
function addIdeasList(snap) {
  var ulList = document.getElementById('list');
  var li = document.createElement('li')
  li.className += " " + "list-group-item";
  li.innerText = snap.val().body;
  var bt1 = document.createElement('button');
  bt1.className += " " + "btn btn-primary btn-sm glyphicon glyphicon-chevron-up floatRight verticalAlign ml10";
  bt1.innerHTML = snap.val().upvotes;
  bt1.setAttribute("data-ideaid", snap.key);
  bt1.setAttribute("onclick", "upvote()");
  li.appendChild(bt1);
  var bt2 = document.createElement('button');
  bt2.className += " " + "btn btn-primary btn-sm glyphicon glyphicon-chevron-down floatRight verticalAlign";
  bt2.innerHTML = snap.val().downvotes;
  bt2.setAttribute("data-ideaid", snap.key);
  bt2.setAttribute("onclick", "downvote()");
  li.appendChild(bt2);
  ulList.appendChild(li);
}

/**
 *The upvote function
 *@param e - The event event paramater
*/
function upvote(e) {
  var newupvote
  e = e || window.event;
  var targ = e.target || e.srcElement;
  if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug
  var ideaid = targ.dataset.ideaid;

  //get upvotes value
  var upvotes = firebase.database().ref('ideas/' + ideaid + '/upvotes');

  //Monitor upvotes value change
  upvotes.on('value', function (snapshot) {
    currentUpvote = snapshot.val();
    
    //increment it
    newupvote = snapshot.val() + 1;
  });

  //update db with new value
  var updateData = {
    upvotes: newupvote
  };
  firebase.database().ref().child("/ideas/" + ideaid).update(updateData);
  targ.innerHTML = currentUpvote;

}

/**
 *The downvotevote function
 *@param e - The event event paramater
 */
function downvote(e) {
  var newdownvote
  e = e || window.event;
  var targ = e.target || e.srcElement;
  if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug
  var ideaid = targ.dataset.ideaid;

  //get upvotes value
  var downvotes = firebase.database().ref('ideas/' + ideaid + '/downvotes');
  downvotes.on('value', function (snapshot) {
    currentdownvote = snapshot.val();
    
    //increment it
    newdownvote = snapshot.val() - 1;
  });
  targ.innerHTML = currentdownvote;

  //Update the database
  var updateData = {
    downvotes: newdownvote
  };
  firebase.database().ref().child("/ideas/" + ideaid).update(updateData);
}