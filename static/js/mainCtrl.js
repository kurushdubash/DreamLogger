// app.controller('mainCtrl', function($scope) {
//     $scope.firstName= "John";
//     $scope.lastName = "Doe";
// });

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "partials/login.html"
    });
    // .when("/red", {
    //     templateUrl : "red.htm"
    // })
    // .when("/green", {
    //     templateUrl : "green.htm"
    // })
    // .when("/blue", {
    //     templateUrl : "blue.htm"
    // });
});
// app.config(['$routeProvider', function ($routeProvider) {
//   $routeProvider
//     // Home
//     .when("/", {templateUrl: "partials/login.html", controller: "mainCtrl"})
//     // Pages
//     .when("/about", {templateUrl: "partials/about.html", controller: "mainCtrl"})
//     .when("/faq", {templateUrl: "partials/faq.html", controller: "mainCtrl"})
//     .when("/pricing", {templateUrl: "partials/pricing.html", controller: "mainCtrl"})
//     .when("/services", {templateUrl: "partials/services.html", controller: "mainCtrl"})
//     .when("/contact", {templateUrl: "partials/contact.html", controller: "mainCtrl"})

//     // else 404
//     .otherwise("/404", {templateUrl: "partials/404.html", controller: "mainCtrl"});
// }]);