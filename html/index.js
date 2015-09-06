var app = angular.module("app", []);

app.controller("main", ['$scope', '$http', function ($scope, $http) {
        $scope.name = "Kevin";

        $scope.jokes = [];
        $scope.predicate = '';
        $scope.reverse = false;

        $scope.people = ['kevin', 'youen', 'jonathan', 'rudy', 'aurélien'];

        $http.get('api/joke')
            .success(function (data) {
                $scope.jokes = data;
            }).
            error(function (data, status, headers, config) {
                console.log(data);
            });

        $scope.addComment = function (joke, comment) {
            if (joke.comments == undefined) {
                joke.comments = [];
            }
            comment.date = new Date();
            joke.comments.push(comment);
            $http.put('api/joke', joke)
                .success(function (data) {
                }).
                error(function (data, status, headers, config) {
                    console.log(data);
                });
        }


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

        $scope.order = function (order) {
            $scope.predicate = order;
            $scope.reverse = !$scope.reverse;
        }
    }]
);

app.controller("jokeController", function ($scope, $http, $rootScope) {
    $scope.addFavorite = function (joke) {
        joke.favorite = true;
        updateJoke(joke);
        $rootScope.$broadcast('favorite', joke);
    }

    $scope.removeFavorite = function (joke) {
        joke.favorite = false;
        updateJoke(joke);
        $rootScope.$broadcast('unfavorite', joke);
    }
    $scope.plusOne = function (joke) {

        if (joke.score == undefined) {
            joke.score = 0;

        }
        joke.score += 1;
        updateJoke(joke);
        $rootScope.$broadcast('plusOne', joke);
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


app.controller("notificationController", ['$scope', '$rootScope', function ($scope, $rootScope) {

    $scope.$on('plusOne', function (event, joke) {
        if (joke != undefined) {
            $scope.notification = "+1 sur blague \"" + joke.txt + "\"";
        }
    });
    $scope.$on('favorite', function (event, joke) {
        if (joke != undefined) {
            $scope.notification = "\"" + joke.txt + "\" ajouté aux favoris.";
        }
    });
    $scope.$on('unfavorite', function (event, joke) {
        if (joke != undefined) {
            $scope.notification = "\"" + joke.txt + "\" retiré des favoris.";
        }
    });

}]);