var app = angular.module("dreamspace", ["ngRoute", "ngAnimate"]);
app.config(function($routeProvider) {
	$routeProvider
	.when("/", {templateUrl : "partials/login.html"})
	.when("/login", {templateUrl : "partials/login.html"})
	.when("/about", {templateUrl : "partials/about.html"})
	.when("/dashboard", {templateUrl : "partials/dashboard.html"})
	.when("/recoverAuth", {templateUrl : "partials/recoverAuth.html"})
	.when("/log", {templateUrl : "partials/log.html"})
	.when("/signup", {templateUrl : "partials/signup.html"});
});
function h(e) {
  $(e).css({'height':'auto','overflow-y':'hidden'}).height(e.scrollHeight);
}

// Initialize Firebase
var config = {
	apiKey: "AIzaSyAoBe1jTqPvguopaREZvLOgJBaq7UCu-0s",
	authDomain: "dream-logger-6b7c0.firebaseapp.com",
	databaseURL: "https://dream-logger-6b7c0.firebaseio.com",
	storageBucket: "dream-logger-6b7c0.appspot.com",
	};
firebase.initializeApp(config);

function sendPasswordReset() {
	var email = document.getElementById('email').value;
	firebase.auth().sendPasswordResetEmail(email).then(function() {
	}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode == 'auth/invalid-email') {
	  		displayAlert(2, errorMessage);
		} else if (errorCode == 'auth/user-not-found') {
	  		displayAlert(2, errorMessage);
		}
		return;
	});
	window.location.href = "#/login";
}

function microphoneStart() {
	document.getElementById('listening').innerHTML = "<div class='uil-ripple-css' style='transform:scale(0.96);'><div></div><div></div></div>"
}

function handleSignUp() {
	var $btn = $('#create-button').button('loading');
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	var password_2 = document.getElementById("password-2").value;
	var displayName = document.getElementById('name').value;
	var regExp = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}';
	if (email.length < 4 || regExp.search(email) == 0) {
		var $btn = $('#create-button').button('loading');
	  	displayAlert(2, "Please enter a valid email address.");
		var $btn = $('#create-button').button('reset');
	}
	if (password.length < 7) {
		var $btn = $('#create-button').button('loading');
	  	displayAlert(2, "Please enter a password with greater than 7 characters.");
		var $btn = $('#create-button').button('reset');
		return;
	}
	if (password != password_2){
		var $btn = $('#create-button').button('loading');
	  	displayAlert(2, "Your passwords do not match. Please verify your passwords.");
		var $btn = $('#create-button').button('reset');
		return;
	}
  	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode == 'auth/weak-password') {
	  		displayAlert(2, "This password is too weak.");
		} else {
	  		displayAlert(2, errorMessage);
		}
		var $btn = $('#create-button').button('loading');
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
		window.location.href = "#/";
	}, function(error) {
	  	displayAlert(2, "An error occured while signing out.");
	});
}

function handleFacebookSignIn() {
    var $btn = $('#facebook-button').button('loading');
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_birthday');
        provider.addScope('email');
        provider.addScope('public_profile');
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			firebase.auth().signInWithRedirect(provider).then(function(result) {
	        	// This gives you a Facebook Access Token. You can use it to access the Facebook API.
	        	var token = result.credential.accessToken;
	          	// The signed-in user info.
	          	var user = result.user;
	        }).catch(function(error) {
	         	var errorCode = error.code;
	          	var errorMessage = error.message;
	            var email = error.email;
	            var credential = error.credential;
		        if (errorCode === 'auth/account-exists-with-different-credential') {
		  			displayAlert(2, "You have already signed up with a different auth provider for that email.");
	        	} else {
		  			displayAlert(2, error);
	          	}
	    		var $btn = $('#facebook-button').button('reset');
	    		return;
	    	});
		}else{
			firebase.auth().signInWithPopup(provider).then(function(result) {
        		// This gives you a Facebook Access Token. You can use it to access the Facebook API.
        		var token = result.credential.accessToken;
          		// The signed-in user info.
          		var user = result.user;
        	}).catch(function(error) {
         		var errorCode = error.code;
          		var errorMessage = error.message;
            	var email = error.email;
            	var credential = error.credential;
		        if (errorCode === 'auth/account-exists-with-different-credential') {
		  			displayAlert(2, "You have already signed up with a different auth provider for that email.");
	        	} else {
		  			displayAlert(2, error);
	          	}
	    		var $btn = $('#facebook-button').button('reset');
	    		return;
    		});
		}
    } else {
        firebase.auth().signOut();
    }
    firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			window.location.href = "#/dashboard";
		}
  	});
}

function handleSignIn(){
    var $btn = $('#sign-in-button').button('loading');
  	var email = document.getElementById('email').value;
  	var password = document.getElementById('password').value;
  	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
	  	var errorCode = error.code;
	  	var errorMessage = error.message;
	  	console.log(errorMessage);
	  	displayAlert(2, "Username or Password is incorrect.");
    	var $btn = $('#sign-in-button').button('reset');
    	return;
	});
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			window.location.href = "#/dashboard";
		}
  	});
}

var timer = null;
function displayAlert(number, message){
	var alertType = '';
	if(number == 0){
		alertType = "alert-info";
	}else if(number == 1) {
		alertType = "alert-warning";
	}else if(number == 2) {
		alertType = "alert-danger";
	}else if(number == 3) {
		alertTpye = "alert-success";
	};
	var alertHtml = '<div class="alert ' + alertType + '"><strong> ' + message + '</strong> </div>';
	document.getElementById('custom-alert').innerHTML = alertHtml;
	timer = setTimeout(removeAlert, 4500);
}

function removeAlert(){
	document.getElementById('custom-alert').className += " alert-out"
	clearTimeout(timer);
	timer = setTimeout(function(){ 
		document.getElementById('custom-alert').innerHTML = '';
		document.getElementById('custom-alert').className='ng-scope';	
		}, 
		1600
	);

}

function initApp() {
  	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log("Signed in");
			document.getElementById('header-signup').style.display='none';
			document.getElementById('header-login').style.display='none';
			document.getElementById('header-logoff').style.display='block';

			var displayName = user.displayName;
          	var email = user.email;
          	var photoURL = user.photoURL;
         	var uid = user.uid;
         	var refreshToken = user.refreshToken;
          	var providerData = user.providerData;
		} else {
			// User is signed out.
			document.getElementById('header-signup').style.display='block';
			document.getElementById('header-login').style.display='block';
			document.getElementById('header-logoff').style.display='none';
			console.log("Not signed in");
		}
  	});
}

window.onload = function() {
  initApp();
};
