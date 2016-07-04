var app = angular.module("dreamspace", ["ngRoute", "ngAnimate"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {templateUrl : "partials/login.html"})
    .when("/login", {templateUrl : "partials/login.html"})
    .when("/partials/login", {templateUrl : "partials/login.html"})
    .when("/signup", {templateUrl : "partials/signup.html"});
    // .when("/green", {
    //     templateUrl : "green.htm"
    // })
    // .when("/blue", {
    //     templateUrl : "blue.htm"
    // });
});