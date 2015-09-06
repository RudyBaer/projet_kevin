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

app.controller("jokeController", function ($scope) {
    $scope.addFavorite = function (joke) {
        joke.favorite = true;
    }

    $scope.removeFavorite = function (joke) {
        joke.favorite = false;
    }
});