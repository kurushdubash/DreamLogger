var app = angular.module("dreamspace", ["ngRoute", "ngAnimate"]);
app.config(function($routeProvider) {
	$routeProvider
	.when("/", {templateUrl : "partials/login.html"})
	.when("/login", {templateUrl : "partials/login.html"})
	.when("/about", {templateUrl : "partials/about.html"})
	.when("/dashboard", {templateUrl : "partials/dashboard.html"})
	.when("/signup", {templateUrl : "partials/signup.html"});
});

// Initialize Firebase
var config = {
	apiKey: "AIzaSyAoBe1jTqPvguopaREZvLOgJBaq7UCu-0s",
	authDomain: "dream-logger-6b7c0.firebaseapp.com",
	databaseURL: "https://dream-logger-6b7c0.firebaseio.com",
	storageBucket: "dream-logger-6b7c0.appspot.com",
	};
firebase.initializeApp(config);

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	var password_2 = document.getElementById("password-2").value;
	var displayName = document.getElementById('name').value;
	if (email.length < 4) {
		alert('Please enter an email address.');
		return;
	}
	if (password.length < 7) {
		alert('Please enter a password with greater length than 7 characters.');
		return;
	}
	if (password != password_2){
		alert('Your passwords do not match. Please confirm your password. ')
		return;
	}
	// Sign in with email and pass.
	// [START createwithemail]
  	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode == 'auth/weak-password') {
			alert('The password is too weak.');
		} else {
			alert(errorMessage);
		}
		console.log(error);
  	});
  	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
		window.location.href = "#/dashboard";
		}
  	});
}

function handleSignOff(){
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	 	console.log("Signing out...");
		document.getElementById('header-login').innerHTML = '<a href="#/login" class="hidden-xs"><span class="glyphicon glyphicon-user"></span> Login</a>';
		window.location.href = "#/";
	}, function(error) {
		console.log("An error occured while signing out.");
		console.log(error);
	});
}

function handleSignIn(){
  	var email = document.getElementById('email').value;
  	var password = document.getElementById('password').value;
  	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  	// Handle Errors here.
	  	var errorCode = error.code;
	  	var errorMessage = error.message;
	  	console.log(errorMessage);
	});
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
		window.location.href = "#/dashboard";
		}
  	});
}
/**
 * Handles registering callbacks for the auth status.
 *
 * This method registers a listener with firebase.auth().onAuthStateChanged. This listener is called when
 * the user is signed in or out, and that is where we update the UI.
 *
 * When signed in, we also authenticate to the Firebase Realtime Database.
 */
function initApp() {
  	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log("Signed in");
			document.getElementById('header-login').innerHTML = '<a href="#/" class="hidden-xs" onclick="javascript:handleSignOff()"><span class="glyphicon glyphicon-user"></span> Logoff</a>';
			// window.location.href = "#/dashboard";
		} else {
			// User is signed out.
			console.log("Not signed in");
		}
  	});
}

window.onload = function() {
  initApp();
};
