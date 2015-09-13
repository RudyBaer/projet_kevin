app.directive('joke', function () {
    return {
        templateUrl: 'directive/joke/joke.html',
        restrict: 'E',
        scope: {
            joke: "=joke"
        }
    }
});
