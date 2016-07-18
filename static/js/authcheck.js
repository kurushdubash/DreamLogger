
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
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  if (password != password_2){
  	alert('Your passwords do not match. Please confirm your password. ')
  	return;
  }
  // Sign in with email and pass.
  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END createwithemail]
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
      // window.location.href = "#/dashboard";
    } else {
      // User is signed out.
      console.log("Not signed in");
    }
  });
  document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
}

window.onload = function() {
  initApp();
};
  