var app = angular.module("dreamspace", ["ngRoute", "ngAnimate"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {templateUrl : "partials/login.html"})
    .when("/login", {templateUrl : "partials/login.html"})
    .when("/about", {templateUrl : "partials/about.html"})
    .when("/dashboard", {templateUrl : "partials/dashboard.html"})
    .when("/signup", {templateUrl : "partials/signup.html"});
});