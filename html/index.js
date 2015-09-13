var app = angular.module("app", ['ngRoute']);

app.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'partial/main.html',
            controller: 'mainCtrl'
        })
        .otherwise({
            template: '<div>Page 404</div>'
        });

});

app.filter('score', function () {

    var STARS = {
        1: '\u2605',
        2: '\u2605\u2605',
        3: '\u2605\u2605\u2605',
        4: '\u2605\u2605\u2605\u2605',
        5: '\u2605\u2605\u2605\u2605\u2605'
    };

    return function (startCount) {
        return STARS[startCount];
    };
});