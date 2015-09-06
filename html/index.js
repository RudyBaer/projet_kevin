var app = angular.module("app", []);

app.controller("main", ['$scope', '$http', function ($scope, $http) {
        $scope.name = "Kevin";

        $scope.jokes = [];

        $http.get('api/joke')
            .success(function (data) {
                $scope.jokes = data;
            }).
            error(function (data, status, headers, config) {
                console.log(data);
            });


        $scope.jokefilter = "";

        $scope.addJoke = function (joke) {
            console.log(joke);
            $scope.joke = "";
            var j = {};
            j.txt = joke;
            j.date = new Date();
            $http.post('api/joke', j)
                .success(function (data) {
                    $scope.jokes.push(j);
                    $scope.joke = "";
                }).
                error(function (data, status, headers, config) {
                    console.log(data);
                });
        }
    }]
);

app.controller("jokeController", function ($scope, $http) {
    $scope.addFavorite = function (joke) {
        joke.favorite = true;
        updateJoke(joke);
    }

    $scope.removeFavorite = function (joke) {
        joke.favorite = false;
        updateJoke(joke);
    }
    $scope.plusOne = function (joke) {

        if (joke.score == undefined) {
            joke.score = 0;

        }
        joke.score += 1;
        updateJoke(joke);
    }


    var updateJoke = function (joke) {
        $http.put('api/joke', joke)
            .success(function (data) {

            }).
            error(function (data, status, headers, config) {
                console.log(data);
            });
    }

});