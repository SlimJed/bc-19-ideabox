(function(){
// Initialize Firebase
    var config = {
    apiKey: "AIzaSyD9XNmswgLSwsJoCbM89meKN_offp-ERdE",
    authDomain: "ideabox-15cf7.firebaseapp.com",
    databaseURL: "https://ideabox-15cf7.firebaseio.com",
    storageBucket: "ideabox-15cf7.appspot.com",
    messagingSenderId: "883050155915"
    };
    firebase.initializeApp(config);

    //Get elements
    const txtEmail = document.getElementById('email');
    const txtPassword = document.getElementById('password');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignup = document.getElementById('btnSignup');
    const newEmail = document.getElementById('regEmail');
    const newPassword = document.getElementById('regPassword');
    const newUsername = document.getElementById('regUsername');

    //Add login event
    btnLogin.addEventListener('click', e => {
    	//Get email and pass
    	const email =txtEmail.value;
    	const password = txtPassword.value;
    	const auth = firebase.auth(); 

    	//Sign in
    	const promise = auth.signInWithEmailAndPassword(email,password);
    	promise.catch(e => console.log(e.message));
    });



  })();