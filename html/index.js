var app = angular.module("app", []);

app.controller("main", function ($scope) {
        $scope.name = "Kevin";

        $scope.jokes = [];

        $scope.jokefilter = "";

        $scope.addJoke = function (joke) {
            console.log(joke);
            $scope.joke = "";
            var j = {};
            j.txt = joke;
            j.date = new Date();
            $scope.jokes.push(j);
            $scope.joke = "";
        }
    }
);

app.controller("jokeController", function ($scope) {
    $scope.addFavorite = function (joke) {
        joke.favorite = true;
    }

    $scope.removeFavorite = function (joke) {
        joke.favorite = false;
    }
});