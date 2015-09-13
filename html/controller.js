app.controller("mainCtrl", ['$scope', '$http', 'jokeService', function ($scope, $http, jokeService) {
        $scope.name = "Kevin";

        $scope.jokes = [];
        $scope.predicate = '';
        $scope.reverse = false;

        $scope.people = ['kevin', 'youen', 'jonathan', 'rudy', 'aurélien'];

        jokeService.getJokes().then(function (data) {
            $scope.jokes = data;
        });

        $scope.addComment = jokeService.addComment;


        $scope.jokefilter = "";

        $scope.addJoke = function (joke) {
            jokeService.addJoke(joke).then(function () {
                    var j = {};
                    j.txt = joke;
                    j.date = new Date();
                    $scope.jokes.push(j);
                    $scope.joke = "";
                }
            );
        }

        $scope.order = function (order) {
            $scope.predicate = order;
            $scope.reverse = !$scope.reverse;
        }

        $scope.validate = function (comment) {
            if (comment != undefined && comment.txt != undefined && comment.txt != "" && comment.name != undefined && comment.name != "") {
                return false;
            } else {
                return true;
            }
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