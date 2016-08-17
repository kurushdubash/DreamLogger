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

var displayName = '';
var email = '';
var photoURL = '';
var uid = '';
var refreshToken = '';
var providerData = '';

var isMobile = false;
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

function sendPasswordReset() {
    var $btn = $('#sign-in-button').button('loading');
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
    	var $btn = $('#sign-in-button').button('reset');
		return;
	});
	displayAlert(0, "Instructions on how to reset your password have been sent to your account. Redirecting you to homepage now.", 5000);
    var $btn = $('#sign-in-button').button('reset');
	setTimeout(function(){window.location.href = "#/login";}, 4000);
}

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.maxAlternatives = 1;

function microphoneStart() {
	var currentClasses = document.getElementById('microphone-listener').className;
	if(currentClasses.indexOf("microphone-listening") > -1){
		document.getElementById('microphone-listener').className = "round-button round-button-microphone";	
		document.getElementById('microphone-listener').innerHTML = '<i class="fa fa-microphone fa-lg"></i></button>';
		recognition.stop();
	}else{
		document.getElementById('microphone-listener').className += " microphone-listening";
		var mobile = '';
		if(!isMobile){
			mobile = 'fa-lg';
		}
		document.getElementById('microphone-listener').innerHTML = '<i class="fa fa-stop "' + mobile + ' aria-hidden="true"></i>';	
		webkitRecognition();
	}
}

function webkitRecognition(){
    recognition.onerror = function(event) {
        displayAlert(2, "There was a recognition error.");
    };

    recognition.onend = function() {
        recognizing = false;
    };

	var initial = capFirstLetter(document.getElementById("dream_text").innerHTML + " ");
	var final_transcript = initial;

	recognition.onresult = function(event) {
		var interim_transcript = '';
		if (typeof(event.results) == 'undefined') {
	  		recognition.onend = null;
	  		recognition.stop();
	  		return;
		}
		for (var i = event.resultIndex; i < event.results.length; ++i) {
			if (event.results[i].isFinal) {
		    	final_transcript += event.results[i][0].transcript;

		  	} else {
		    	interim_transcript += event.results[i][0].transcript;
		  	}
		}
		document.getElementById("dream_text").innerHTML = initial + capFirstLetter(interim_transcript);
		if(final_transcript.length > initial.length){
			final_transcript = capFirstLetter(final_transcript);
			console.log(final_transcript);
			document.getElementById("dream_text").innerHTML = final_transcript;
			initial = document.getElementById("dream_text").innerHTML;
		}
		
  	};
	recognition.start();
}


function capFirstLetter(str) {
    var string = str.replace(/.+?[\.\?\!](\s|$)/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    return string.charAt(0).toUpperCase() + string.slice(1);
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
			//update db here
			var postData = {
				name: displayName,
				email: email,
				photo_url: "",
				created: getCurDate()
			}
			var updates = {};
			updates['/users/' + uid ] = postData;
	  		firebase.database().ref().update(updates).catch(function(error){
				displayAlert(2, "There was an error creating your account");
				return;
	  		});
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
        if(isMobile) {
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
	  	displayAlert(2, "Email or Password is incorrect.");
    	var $btn = $('#sign-in-button').button('reset');
    	return;
	});
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			var welcomeString = '';
			if(user.mame != undefined){
				welcomeString = ", " + user.name;
			}
			window.location.href = "#/dashboard";
		}
  	});
}

function displayAlert(number, message, timeout){
	if(timeout == undefined){
		timeout = 4000;
	}
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
	setTimeout(removeAlert, timeout);
}

function logDream(){
	try{
		var title = document.getElementById("dream-title").innerHTML;
		if(title.length == 0){
			var title = getCurDate();
		}
		var postData = {
			text: document.getElementById("dream_text").innerHTML,
			timestamp: getCurDate(),
			lucid: false,
			notes: "",
			title: title
		}
		var newPostKey = firebase.database().ref().child('dreams/' + uid + "/").push().key;
		var updates = {};
		updates['/dreams/' + uid + "/" + newPostKey] = postData;
	  	firebase.database().ref().update(updates).catch(function(error){
			displayAlert(2, "There was an error saving your dream.");
			return;
	  	});
	}catch(err){
		displayAlert(2, "There was an error saving your dream.");
		console.log(err);
		return;
	}
	
	var dream_text = document.getElementById("dream_text").innerHTML;
	if(!dream_text.length > 0 && !document.getElementById("dream-title").innerHTML.length > 0 ){
		swal({
			title:"Empty Message",
			text: "No content was entered.",
			type: "info",
			timer: 1500
			})
		return;
	}
	setTimeout(
		function(){
			swal({
				title: "Dream Saved", 
				text: "Your dream entry has been saved.", 
				type:"success", 
				timer:2000
			});
		}, 200);
	setTimeout(function(){window.location.href = "#/dashboard";}, 2600);

}

function getCurDate(){
	var stringDate = '';
	var date = new Date();
	return date.toISOString();
}

function getDashBoardHTML(){
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			var uid = firebase.auth().currentUser.uid;
			var db = firebase.database();
			var ref = db.ref("dreams/" + uid + "/");
			ref.orderByKey().on("value", function(snapshot) {
				getDashboardHTMLHelper(snapshot.val());
			}, function (errorObject) {
				console.log("The read failed: " + errorObject.code);
			});
		}
	});
}

function getDashboardHTMLHelper(response){
	var finalString = "</div>";
	for(var key in response){
		var value = response[key];
		var htmlString = '' +
		'<div class="dream-list-item">' +
            '<div class="dream-date-item">' +
                '<div class="dream-date-month">FEB</div>' +
                '<div class="dream-date-day">06</div>' +
            '</div>' +
            '<div class="dream-text-item">' +
                '<div class="dream-text-heading">' + value.title + '</div>' +
                '<p class="dream-text-description">' + value.text + '</p>' +
            '</div>' +
    	'</div> ';
    	finalString = htmlString + finalString;
	}
	finalString = '<div id="dream_log" class="dream-list-log">' + finalString;
	
	document.getElementById("dream_log").innerHTML = finalString;
}

function cancelDream(){
	if(!document.getElementById("dream_text").innerHTML.length > 0 && !document.getElementById("dream-title").innerHTML.length > 0 ){
		window.location.href = "#/dashboard";
		return;
	}
	setTimeout(
		function(){
			swal({
			    title: "Delete Dream Entry?",   
				text: "Are you sure you want to delete this dream entry?",   
				type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   
				confirmButtonText: "Delete",   
				closeOnConfirm: true 
			}, 
			function(){window.location.href = "#/dashboard";}
				);	
		}, 200);
}

function removeAlert(){
	document.getElementById('custom-alert').className += " alert-out"
	timer = setTimeout(function(){ 
		document.getElementById('custom-alert').innerHTML = '';
		document.getElementById('custom-alert').className='ng-scope';	
		}, 
		1600
	);
}

function createDreamEntry(){
	window.location.href = "#/log";
}


function initApp() {
  	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log("Signed in");
			document.getElementById('header-signup').style.display='none';
			document.getElementById('header-login').style.display='none';
			document.getElementById('header-logoff').style.display='block';

			displayName = user.displayName;
          	email = user.email;
          	photoURL = user.photoURL;
         	uid = user.uid;
         	refreshToken = user.refreshToken;
          	providerData = user.providerData;
          	if(window.location.href.indexOf("#/login") > -1){
				window.location.href = "#/dashboard";
			}
		} else {
			// User is signed out.
			if(window.location.href.indexOf("#/dashboard") > -1){
				window.location.href = "#/login";
				displayAlert(2, "You need to be logged in to access this resource.");
			}
			document.getElementById('header-signup').style.display='block';
			document.getElementById('header-login').style.display='block';
			document.getElementById('header-logoff').style.display='none';
			console.log("Not signed in");
		}
  	});
}
$( document ).ready( initApp() );

// window.onload = function() {
//   initApp();
// };
