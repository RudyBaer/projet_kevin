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